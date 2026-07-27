# Knowledge Transfer (KT) Guide: UVU Computer Shop

This point-by-point guide is structured for a live presentation or handoff meeting with your client. You can present this document directly to explain the project implementation.

---

## 1. Project Background & Business Rules
*   **Target Portal:** An e-commerce system built for **Utah Valley University (UVU)** in collaboration with **Dell Technologies** and **Terralogic**.
*   **Design Concept:** Premium, clean, minimalist design (Apple-inspired look) with high contrast, thin borders, glassmorphism, hover transitions, and a full dark/light mode toggle.
*   **Government Tax Exemption:** Because UVU is a public state university, it is tax-exempt. The system calculates sales tax dynamically at **0%** at checkout, but maintains variable compatibility for database entries.
*   **Strict No-Refunds Policy:** University procurement guidelines require all sales to be final. The codebase disables returns/refunds entirely:
    *   No return buttons or return reason dialog boxes exist on the tracking dashboards.
    *   Deprecated return functions exist in context declarations only to maintain type stability.

---

## 2. Core Tech Stack (Why we chose it)
*   **Next.js 16.2 (App Router):** Chosen for layout management, page metadata optimizations, SEO, and fast routing.
*   **React 19.2 + React Compiler:** Used to ensure the UI updates instantly without lag. The React Compiler automatically optimizes rendering cycles.
*   **TypeScript 5.x:** Provides a reliable development experience with type definitions, preventing bugs during runtime.
*   **Tailwind CSS 4.0:** Provides lightweight, fast CSS styling with utility classes for dark mode and transitions.
*   **PostCSS:** Handles compiling styles and ensuring backwards-compatibility for older browsers.
*   **HTML5 LocalStorage:** Persists the user's theme selection, shopping cart, and order history on their machine so it survives refresh/session loss without a heavy backend database dependency.

---

## 3. Architecture & State Management (React Contexts)
State is split into four distinct context files located under `src/context/` to keep components responsive and avoid full-page re-renders:
*   **Theme Context (`ThemeContext.tsx`):**
    *   Handles switching between light and dark themes.
    *   Saves the theme value in the browser storage.
    *   Includes a small pre-render script in `layout.tsx` to stop screen "flash" issues during dark mode reloads.
*   **Auth Context (`AuthContext.tsx`):**
    *   Simulates student/faculty login session states.
    *   Retrieves and displays the customer name globally in the navigation header.
*   **Cart Context (`CartContext.tsx`):**
    *   Manages dynamic cart additions, quantity changes, and item removals.
    *   Contains the **0% Tax logic** for UVU orders.
*   **Order Context (`OrderContext.tsx`):**
    *   Simulates placing orders and generates tracking numbers like `UVU-XXXXXX`.
    *   Enables status upgrades (Processing ➔ Shipped ➔ Delivered) for client testing.
    *   Enforces the **no-returns** rule.

---

## 4. Key User Flow Walkthroughs

### Homepage (`src/app/page.tsx`)
*   Features a large hero layout showcasing the new *Dell XPS 16 Laptop*.
*   Presents clickable category grid cards (Laptops, Desktops, and Accessories).
*   If a user clicks on the "Accessories" category card, a custom "Coming Soon" popup modal prompts them that more stock is coming next week.
*   Presents an Apple-style value proposition layout highlighting warranty specifications.

### Dynamic Catalog (`src/app/accessories/page.tsx`)
*   Integrates a live search bar that queries titles and descriptions as you type.
*   Filters catalog entries dynamically using a price range slider (up to $3,000).
*   Sorts products dynamically by price (low to high, high to low) and rating.

### Product Detail Page (`src/app/product/[id]/page.tsx`)
*   Includes a gallery carousel showing multiple angles (front, back, side, top, zoom). Selecting a thumbnail updates the main preview instantly.
*   Includes dynamic warehouse stock status notices ("Out of stock" vs "In stock").
*   Includes dynamic key features highlights and specifications lists.

### Cart & Checkouts (`src/app/cart/page.tsx`)
*   Uses a multi-step checkout workflow:
    1.  **Step 1:** Review Cart & Quantities.
    2.  **Step 2:** User login check (prompting account sign-in).
    3.  **Step 3:** Enter shipping address details.
    4.  **Step 4:** Select payment (supports mock Credit Cards or university Purchase Orders).
    5.  **Step 5:** Display success screen, clear cart, update local stock totals, and register the new order.

### Order Tracking (`src/app/orders/page.tsx`)
*   Secures tracking details using an Auth wall; only logged-in users can track orders.
*   Displays progress badges: **Processing** (Amber), **Shipped** (Blue), and **Delivered** (Green).
*   Allows canceling orders that are still processing, but strictly blocks returning delivered orders.

---

## 5. Deployment & Execution Checklist
1.  **Setup Dependencies:** Run `npm install` to download node packages.
2.  **Run Development Environment:** Execute `npm run dev` to host on `localhost:3000`.
3.  **Verify Production Readiness:** Execute `npm run build` to verify type safety and build optimizations.
4.  **Run Production Server:** Execute `npm start` to test the built app on server.
