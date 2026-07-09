# NEXORA GEAR - Premium Gaming E-Commerce Platform

**NEXORA GEAR** is a modern, premium, fully responsive gaming e-commerce platform designed as a college major project. It features a dark-themed cyberpunk gaming aesthetic, neon glowing interactions, glassmorphic styling, and fluid motion animations.

This application is built with **React (Vite)** on the frontend and **Firebase (Cloud Firestore & Storage)** on the backend, supporting **Guest-Only Shopping** (no authentication required) to simplify evaluations and grading.

## Key Features

- **Premium Interface:** Custom dark gray obsidian layouts, glowing range sliders, animated category icons, and pulsing neon buttons.
- **Dual Database Core:** Automatic fallback support. If Firebase environment keys are not configured, the application operates locally utilizing `localStorage` and memory states, allowing immediate grading without database configuration.
- **Developer Seeding Panel:** Built-in dashboard on the `/admin/seed` route to clear collections, upload sample gaming images to Firebase Storage, and insert default categories, products, and reviews in one click.
- **Frictionless Shopping:** Multi-image product details, live search with autocomplete suggestions, advanced sidebar filters, persistent shopping cart, tax calculations, and a simulated UPI/Card guest checkout flow.

---

## Tech Stack

- **Frontend Framework:** React.js (Vite)
- **Styling Layout:** Tailwind CSS
- **Routing Engine:** React Router DOM (v6)
- **Animations:** Framer Motion
- **Icon Library:** React Icons
- **Toast Notifications:** React Toastify
- **Backend Infrastructure:** Firebase (Cloud Firestore & Storage)

---

## Folder Structure

```text
src/
├── components/          # Reusable components (Navbar, Footer, ProductCard, Skeleton)
│   └── ui/              # Atom level elements (Button, Input)
├── context/             # Global states (CartContext handles localStorage synchronicity)
├── pages/               # Page structures (Home, Shop, Details, Cart, Checkout, Success, About, Contact, Seeder)
├── services/            # Database configurations & offline mock listings
│   ├── firebase.js      # Firebase SDK core interfaces and local fallbacks
│   └── mockData.js      # Default database seed listings
├── utils/               # Currency formatting & helper scripts
└── index.css            # Base stylesheet, custom scrollbars, and RGB animations
```

---

## Local Setup Instructions

### 1. Clone the project and navigate to the directory
```bash
cd e-commerce_project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Firebase Configuration (Optional but recommended)
Copy the environment template and name it `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your Firebase project configuration coordinates:
```ini
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 4. Running the Dev Server
Launch the development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## Seeding the Database

### Seeding Firebase (Firestore & Storage)
1. Ensure your Firebase project is configured in `.env`.
2. Set up **Cloud Firestore** and **Firebase Storage** in test mode within your Firebase Console.
3. Open the running website and navigate to `http://localhost:5173/admin/seed`.
4. Click **"Seed Firebase"**. The seeder will:
   - Clean previous records.
   - Fetch royalty-free Unsplash images as Blobs and upload them to your Firebase Storage bucket under `/products`.
   - Populated categories, products, and simulated reviews.
   - Output log statements on screen in a neon terminal wrapper.

### Seeding Offline LocalStorage
If you are running the project without Firebase keys, the website falls back to LocalStorage databases.
1. Navigate to `http://localhost:5173/admin/seed`.
2. Click **"Reset Local DB"** to reset the client state back to the original default products.

---

## Deploying to Firebase Hosting

To host the site live on Google's CDN:

### 1. Build the production assets
```bash
npm run build
```

### 2. Login to Firebase CLI
```bash
npx firebase-tools login
```

### 3. Initialize Firebase Hosting
```bash
npx firebase-tools init hosting
```
- Select your Firebase project.
- Specify **`dist`** as the public directory (since Vite builds compilation outputs to `/dist`).
- Answer **`Yes`** to configuring as a single-page app (rewrites all URLs to `/index.html`).
- Answer **`No`** to automatic builds with GitHub.

### 4. Deploy the build
```bash
npx firebase-tools deploy
```
Your website is now live! Copy the Hosting URL generated in the terminal.

live - https://nexora-gear.web.app/
