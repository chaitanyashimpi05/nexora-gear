import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  query, 
  where, 
  orderBy,
  updateDoc
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { products as localProducts, categories as localCategories, mockReviews } from "./mockData";

// Environment variables check
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

let db = null;
let storage = null;
let isFirebaseAvailable = false;

if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    isFirebaseAvailable = true;
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase failed to initialize: ", error);
  }
} else {
  console.warn("Firebase configuration is missing. Falling back to offline mock database mode.");
}

// Initializing LocalStorage databases for fallback
const initLocalDb = () => {
  if (!localStorage.getItem("nexora_products")) {
    localStorage.setItem("nexora_products", JSON.stringify(localProducts));
  }
  if (!localStorage.getItem("nexora_categories")) {
    localStorage.setItem("nexora_categories", JSON.stringify(localCategories));
  }
  if (!localStorage.getItem("nexora_reviews")) {
    localStorage.setItem("nexora_reviews", JSON.stringify(mockReviews));
  }
  if (!localStorage.getItem("nexora_orders")) {
    localStorage.setItem("nexora_orders", JSON.stringify([]));
  }
  if (!localStorage.getItem("nexora_contact_messages")) {
    localStorage.setItem("nexora_contact_messages", JSON.stringify([]));
  }
};
initLocalDb();

export { db, storage, isFirebaseAvailable };

// ==========================================
// DB OPERATIONS
// ==========================================

// Get All Categories
export const getCategories = async () => {
  if (isFirebaseAvailable) {
    try {
      const q = query(collection(db, "categories"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (list.length > 0) return list;
      
      // Fallback if collection exists but is empty
      return JSON.parse(localStorage.getItem("nexora_categories"));
    } catch (e) {
      console.error("Error reading categories from Firestore: ", e);
      return JSON.parse(localStorage.getItem("nexora_categories"));
    }
  } else {
    return JSON.parse(localStorage.getItem("nexora_categories"));
  }
};

// Get All Products
export const getProducts = async () => {
  if (isFirebaseAvailable) {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (list.length > 0) return list;
      
      // Fallback if empty in Firestore
      return JSON.parse(localStorage.getItem("nexora_products"));
    } catch (e) {
      console.error("Error reading products from Firestore: ", e);
      return JSON.parse(localStorage.getItem("nexora_products"));
    }
  } else {
    return JSON.parse(localStorage.getItem("nexora_products"));
  }
};

// Get Single Product
export const getProductById = async (id) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
    } catch (e) {
      console.error("Error reading product from Firestore: ", e);
    }
  }
  const products = JSON.parse(localStorage.getItem("nexora_products"));
  return products.find(p => p.id === id) || null;
};

// Get Reviews for a Product
export const getReviews = async (productId) => {
  if (isFirebaseAvailable) {
    try {
      const q = query(
        collection(db, "reviews"), 
        where("productId", "==", productId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
    } catch (e) {
      console.error("Error fetching reviews from Firestore: ", e);
      // Try un-ordered query in case index is not built yet
      try {
        const fallbackQ = query(collection(db, "reviews"), where("productId", "==", productId));
        const snapshot = await getDocs(fallbackQ);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (innerE) {
        console.error("Inner reviews fetch error: ", innerE);
      }
    }
  }
  
  // Local storage fallback
  const reviews = JSON.parse(localStorage.getItem("nexora_reviews")) || [];
  return reviews
    .filter(r => r.productId === productId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Submit a Review
export const submitReview = async (reviewData) => {
  const newReview = {
    ...reviewData,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        ...newReview,
        createdAt: new Date() // Use actual firebase timestamp
      });
      
      // Update average rating on Firestore product (optional, but premium)
      try {
        const productRef = doc(db, "products", reviewData.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const product = productSnap.data();
          const reviewsQ = query(collection(db, "reviews"), where("productId", "==", reviewData.productId));
          const reviewsSnap = await getDocs(reviewsQ);
          const reviewsList = reviewsSnap.docs.map(d => d.data());
          const totalRating = reviewsList.reduce((acc, curr) => acc + curr.rating, 0);
          const avgRating = parseFloat((totalRating / reviewsList.length).toFixed(1));
          
          await updateDoc(productRef, { rating: avgRating });
        }
      } catch (ratingErr) {
        console.error("Failed to update product rating: ", ratingErr);
      }

      return { id: docRef.id, ...newReview };
    } catch (e) {
      console.error("Error saving review to Firestore: ", e);
    }
  }

  // Local storage fallback
  const reviews = JSON.parse(localStorage.getItem("nexora_reviews")) || [];
  const generatedId = `rev-${Math.random().toString(36).substr(2, 9)}`;
  const reviewWithId = { id: generatedId, ...newReview };
  reviews.push(reviewWithId);
  localStorage.setItem("nexora_reviews", JSON.stringify(reviews));

  // Update local product rating
  const products = JSON.parse(localStorage.getItem("nexora_products")) || [];
  const prodIdx = products.findIndex(p => p.id === reviewData.productId);
  if (prodIdx !== -1) {
    const productReviews = reviews.filter(r => r.productId === reviewData.productId);
    const totalRating = productReviews.reduce((acc, curr) => acc + curr.rating, 0);
    products[prodIdx].rating = parseFloat((totalRating / productReviews.length).toFixed(1));
    localStorage.setItem("nexora_products", JSON.stringify(products));
  }

  return reviewWithId;
};

// Create a Guest Order
export const createOrder = async (orderData) => {
  const finalOrder = {
    ...orderData,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        ...finalOrder,
        createdAt: new Date()
      });
      return { id: docRef.id, ...finalOrder };
    } catch (e) {
      console.error("Error creating order in Firestore: ", e);
      throw e;
    }
  }

  // Local storage fallback
  const orders = JSON.parse(localStorage.getItem("nexora_orders")) || [];
  orders.push(finalOrder);
  localStorage.setItem("nexora_orders", JSON.stringify(orders));
  return finalOrder;
};

// Submit Contact Message
export const submitContactMessage = async (messageData) => {
  const finalMsg = {
    ...messageData,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, "contactMessages"), {
        ...finalMsg,
        createdAt: new Date()
      });
      return { id: docRef.id, ...finalMsg };
    } catch (e) {
      console.error("Error saving message to Firestore: ", e);
      throw e;
    }
  }

  // Local storage fallback
  const messages = JSON.parse(localStorage.getItem("nexora_contact_messages")) || [];
  const generatedId = `msg-${Math.random().toString(36).substr(2, 9)}`;
  const messageWithId = { id: generatedId, ...finalMsg };
  messages.push(messageWithId);
  localStorage.setItem("nexora_contact_messages", JSON.stringify(messages));
  return messageWithId;
};
