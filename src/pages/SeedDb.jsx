import React, { useState } from "react";
import { 
  db, 
  storage, 
  isFirebaseAvailable 
} from "../services/firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDocs, 
  deleteDoc 
} from "firebase/firestore";
import { 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";
import { categories, products, mockReviews } from "../services/mockData";
import { FaDatabase, FaCheckCircle, FaExclamationTriangle, FaTerminal, FaTrash } from "react-icons/fa";
import Button from "../components/ui/Button";

const SeedDb = () => {
  const [logs, setLogs] = useState([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingComplete, setSeedingComplete] = useState(false);

  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { text: message, type, time: new Date().toLocaleTimeString() }]);
  };

  // Helper to fetch image as blob (tries with proxy if direct fails, or falls back to direct URL)
  const fetchImageBlob = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("CORS fetch failed");
      return await response.blob();
    } catch (err) {
      // In case of CORS block, we return null to trigger direct URL fallback
      return null;
    }
  };

  // Clean Firebase Collections
  const cleanCollection = async (colName) => {
    addLog(`Checking collection: ${colName}...`, "info");
    const snapshot = await getDocs(collection(db, colName));
    if (snapshot.size > 0) {
      addLog(`Cleaning ${snapshot.size} existing documents from: ${colName}...`, "info");
      const promises = snapshot.docs.map(d => deleteDoc(doc(db, colName, d.id)));
      await Promise.all(promises);
      addLog(`Cleared collection: ${colName}`, "success");
    }
  };

  // Seed Firebase Database
  const handleSeedFirebase = async () => {
    if (!isFirebaseAvailable) return;
    setIsSeeding(true);
    setSeedingComplete(false);
    setLogs([]);
    addLog("Starting Firebase seeding sequence...", "info");

    try {
      // 1. Clean existing records to avoid duplicates
      await cleanCollection("categories");
      await cleanCollection("products");
      await cleanCollection("reviews");
      await cleanCollection("orders");
      await cleanCollection("contactMessages");

      // 2. Seed Categories
      addLog("Seeding Categories...", "info");
      for (const cat of categories) {
        await setDoc(doc(db, "categories", cat.id), cat);
        addLog(`Category created: ${cat.name}`, "success");
      }

      // 3. Seed Products + Storage Images
      addLog("Seeding Products (Uploading images to Firebase Storage where possible)...", "info");
      for (const prod of products) {
        addLog(`Processing product: ${prod.name}...`, "info");
        const uploadedImages = [];

        for (let i = 0; i < prod.images.length; i++) {
          const imgUrl = prod.images[i];
          addLog(`Fetching image ${i + 1} for ${prod.name}...`, "info");
          
          const blob = await fetchImageBlob(imgUrl);
          if (blob && storage) {
            try {
              addLog(`Uploading image ${i + 1} to Firebase Storage...`, "info");
              const sRef = storageRef(storage, `products/${prod.id}/${prod.id}-${i}.jpg`);
              const uploadResult = await uploadBytes(sRef, blob);
              const downloadUrl = await getDownloadURL(uploadResult.ref);
              uploadedImages.push(downloadUrl);
              addLog(`Successfully uploaded image ${i + 1}`, "success");
            } catch (storageErr) {
              addLog(`Storage upload error for image ${i + 1}. Falling back to Unsplash URL.`, "warning");
              uploadedImages.push(imgUrl);
            }
          } else {
            addLog(`Blob fetch blocked by CORS or Storage not ready. Using original Unsplash URL.`, "warning");
            uploadedImages.push(imgUrl);
          }
        }

        const productWithStorageImages = {
          ...prod,
          images: uploadedImages,
          createdAt: new Date() // Use firestore timestamp
        };

        await setDoc(doc(db, "products", prod.id), productWithStorageImages);
        addLog(`Product saved to Firestore: ${prod.name}`, "success");
      }

      // 4. Seed Reviews
      addLog("Seeding Reviews...", "info");
      for (const rev of mockReviews) {
        await setDoc(doc(db, "reviews", rev.id), {
          ...rev,
          createdAt: new Date()
        });
        addLog(`Review saved: "${rev.comment.substring(0, 30)}..." by ${rev.name}`, "success");
      }

      addLog("Firebase Seeding Sequence completed successfully! 🎉", "success");
      setSeedingComplete(true);
    } catch (error) {
      console.error(error);
      addLog(`Seeding failed: ${error.message}`, "error");
    } finally {
      setIsSeeding(false);
    }
  };

  // Reset LocalStorage fallback database
  const handleResetLocalStorage = () => {
    localStorage.removeItem("nexora_products");
    localStorage.removeItem("nexora_categories");
    localStorage.removeItem("nexora_reviews");
    localStorage.removeItem("nexora_orders");
    localStorage.removeItem("nexora_contact_messages");
    
    // re-trigger initial storage setting
    localStorage.setItem("nexora_products", JSON.stringify(products));
    localStorage.setItem("nexora_categories", JSON.stringify(categories));
    localStorage.setItem("nexora_reviews", JSON.stringify(mockReviews));
    localStorage.setItem("nexora_orders", JSON.stringify([]));
    localStorage.setItem("nexora_contact_messages", JSON.stringify([]));

    setLogs([]);
    addLog("Offline LocalStorage databases successfully reset to default settings!", "success");
    setSeedingComplete(true);
  };

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-4xl mx-auto px-4">
      {/* Title */}
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-gaming font-extrabold tracking-tight uppercase">
          Developer <span className="text-gaming-cyan">Seeder Portal</span>
        </h1>
        <p className="text-neutral-400 font-sans max-w-xl mx-auto">
          Initialize and seed the NEXORA GEAR database. This screen lets you quickly seed either Firestore/Storage collections or reset your browser's LocalStorage fallback database.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Config Panel */}
        <div className="glass-card rounded-2xl p-6 border border-neutral-900 md:col-span-1 space-y-6">
          <h2 className="text-lg font-gaming font-bold text-white uppercase border-b border-neutral-800 pb-2">
            System Status
          </h2>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-wider block font-gaming mb-1">
                Firebase Connection
              </span>
              {isFirebaseAvailable ? (
                <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/20 px-3 py-2 rounded-lg border border-emerald-900/40 text-sm">
                  <FaCheckCircle className="text-base flex-shrink-0" />
                  <span className="font-semibold font-gaming uppercase tracking-wider">Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-amber-400 bg-amber-950/20 px-3 py-2 rounded-lg border border-amber-900/40 text-sm">
                  <FaExclamationTriangle className="text-base flex-shrink-0" />
                  <span className="font-semibold font-gaming uppercase tracking-wider">Offline Fallback</span>
                </div>
              )}
            </div>

            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-wider block font-gaming mb-1">
                Database Target
              </span>
              <span className="text-sm font-sans font-medium text-neutral-300">
                {isFirebaseAvailable ? "Cloud Firestore & Storage" : "Browser LocalStorage"}
              </span>
            </div>
          </div>

          <div className="border-t border-neutral-850 pt-4 space-y-3">
            {isFirebaseAvailable ? (
              <Button
                onClick={handleSeedFirebase}
                disabled={isSeeding}
                variant="primary"
                className="w-full text-center"
                icon={FaDatabase}
              >
                {isSeeding ? "Seeding..." : "Seed Firebase"}
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-neutral-400 leading-relaxed font-sans mb-2">
                  To seed a real database, configure Firebase keys in `.env` and restart.
                </div>
                <Button
                  onClick={handleResetLocalStorage}
                  variant="cyan"
                  className="w-full text-center text-xs"
                  icon={FaTrash}
                >
                  Reset Local DB
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Console Log */}
        <div className="glass-card rounded-2xl p-6 border border-neutral-900 md:col-span-2 flex flex-col h-[400px]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <h2 className="text-lg font-gaming font-bold text-white uppercase flex items-center">
              <FaTerminal className="mr-2 text-gaming-cyan" />
              <span>Console Log</span>
            </h2>
            {seedingComplete && (
              <span className="text-xxs px-2 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-900/60 font-gaming uppercase tracking-widest animate-pulse">
                Complete
              </span>
            )}
          </div>

          {/* Terminal Box */}
          <div className="flex-1 bg-black/85 rounded-xl border border-neutral-900 p-4 font-mono text-xs overflow-y-auto space-y-2.5 scrollbar-thin select-text">
            {logs.length === 0 ? (
              <div className="text-neutral-600 italic select-none">
                Waiting for actions...
              </div>
            ) : (
              logs.map((log, index) => {
                let color = "text-neutral-400";
                if (log.type === "success") color = "text-emerald-400";
                if (log.type === "warning") color = "text-amber-400";
                if (log.type === "error") color = "text-red-500 font-semibold";
                
                return (
                  <div key={index} className="flex items-start gap-1">
                    <span className="text-neutral-600 select-none">[{log.time}]</span>
                    <span className={color}>{log.text}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedDb;
