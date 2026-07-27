# UVU Computer Shop — Project Documentation & Architectural Overview

This document provides a comprehensive guide on how the **UVU Computer Shop** (UVU E-Commerce Portal) was built from scratch. It is designed to help you explain the project architecture, tech stack, codebase structure, and features to your client.

---

## 1. Project Overview & Background
The **UVU Computer Shop** is a high-end, responsive e-commerce web portal built in collaboration with **Utah Valley University (UVU)**, **Dell Technologies**, and **Terralogic**. It serves as an elite procurement and retail store simulator for premium laptops, desktops, and computer hardware.

### Key Business & Brand Decisions
*   **Premium Aesthetics:** Inspired by Apple's minimalist and high-contrast design. It features elegant borders, glassmorphism, responsive grid layouts, custom transition animations, and dark/light modes.
*   **Target Audience:** Students, faculty, and administrative staff purchasing premium hardware.
*   **Tax-Exempt Status:** Since Utah Valley University is a public government institution, it is tax-exempt. The shopping cart calculates sales tax at exactly **0%** but retains the data structure variables for backward compatibility.
*   **Strict Return Policy:** To ensure secure university procurement operations, the portal implements a **strict no-refunds and no-returns policy**. Code structures for return features have been safely disabled or deprecated, though older database status logs are preserved for historical purposes.

---

## 2. Technology Stack & Key Dependencies
The portal utilizes modern web technology to guarantee high performance, modular code, and accessibility:

1.  **Core Framework:** `Next.js 16.2.10` utilizing the **App Router** for layout-based rendering, metadata SEO optimization, dynamic page routing, and loading transitions.
2.  **Runtime & Compiler:** `React 19.2.4` and `React DOM 19.2.4` optimized with the new `React Compiler` for high-performance rendering.
3.  **Language:** `TypeScript 5.x` for strong typing, autocomplete, and robust compile-time checks.
4.  **Styling:** `Tailwind CSS 4.x` with `@tailwindcss/postcss` for custom layouts, premium spacing, utility-first responsiveness, and smooth theme-switching animations.
5.  **State Management:** React Context API (custom hooks) for managing Auth, Shopping Cart, Orders, and Theme states globally.
6.  **Storage Persistence:** `localStorage` is used to persist theme choices, cart items, and order histories directly in the browser across sessions.

---

## 3. Directory Structure
The codebase follows Next.js App Router guidelines, segregating logical context layers, presentation components, mock databases, and page directories.

```text
/uvu-ecommerce-application
├── package.json               # Scripts & dependencies configuration
├── tsconfig.json              # TypeScript rules & path aliases
├── next.config.ts             # Next.js configurations
├── tailwind.config.ts / css   # Theme & styles configuration
├── public/                    # Static assets (logos, icons, etc.)
└── src/
    ├── app/                   # Next.js App Router folders
    │   ├── globals.css        # Global CSS rules and Tailwind imports
    │   ├── layout.tsx         # Root layout wrapping Context Providers
    │   ├── page.tsx           # Homepage (Hero, categories, features)
    │   ├── accessories/       # Catalog page (Search, filters, sort)
    │   ├── product/[id]/      # Dynamic Product Detail Page (PDP)
    │   ├── cart/              # Cart review & multi-step checkout
    │   └── orders/            # Order history tracking & management
    ├── components/            # Reusable UI components
    │   ├── Header.tsx         # Sticky navigation, theme toggler, auth dropdown
    │   ├── Footer.tsx         # Responsive site footer
    │   └── ProductCard.tsx    # Standardized product display card
    ├── context/               # Global state contexts (State management)
    │   ├── ThemeContext.tsx   # Light/dark mode controller
    │   ├── AuthContext.tsx    # User session, login, registration
    │   ├── CartContext.tsx    # Add/edit/delete cart items
    │   └── OrderContext.tsx   # Order creation & tracking simulator
    └── data/
        └── products.ts        # Database schema & product catalogs source
```

---

## 4. Architectural State Management (Context API)
State is distributed logically across four React contexts located in `src/context/` to prevent unnecessary re-renders:

### A. Theme State (`ThemeContext.tsx`)
*   **Purpose:** Manages light and dark modes.
*   **No-Flash Script:** Injecting an inline IIFE script block directly into the `<head>` in [layout.tsx](file:///Users/mithunbl-2896/Documents/uvu-ecommerce-application/src/app/layout.tsx#L28-L33) ensures that the client's saved theme from `localStorage` is read and applied before the page renders, completely avoiding any light/white flash on page reload.
*   **State:** Provides `theme` ("light" | "dark") and `toggleTheme()`.

### B. Auth State (`AuthContext.tsx`)
*   **Purpose:** Stores user sessions, username tags, and simulation login states.
*   **State:** Provides `user`, `signIn()`, `signOut()`, and user metadata tags.

### C. Cart State (`CartContext.tsx`)
*   **Purpose:** Handles shopping cart calculations.
*   **Calculations:**
    *   Tracks `cartItems` and calculates quantities.
    *   `cartSubtotal` tracks total prices.
    *   `taxEstimation` is hard-coded to **$0** due to UVU's tax-exempt university status.
    *   Synchronizes modifications to `localStorage` automatically on change.
*   **Functions:** `addToCart()`, `removeFromCart()`, `updateQuantity()`, and `clearCart()`.

### D. Order State (`OrderContext.tsx`)
*   **Purpose:** Simulates checkout completion and order status progression.
*   **Workflow:**
    *   Generates a unique tracking number with prefix (e.g., `UVU-123456`).
    *   Allows managers/users to simulate status changes (`Processing` ➔ `Shipped` ➔ `Delivered`).
    *   Allows canceling orders, but **Return / Refund function triggers have been deprecated and disabled** (as returns are not accepted).

---

## 5. Walkthrough of Main User Flows

### 1. Home Page Flow (`src/app/page.tsx`)
*   **Hero Banner:** Highlights the new *Dell XPS 16 Laptop* with animated, gradient typography, crisp drop-shadow imagery, and a direct CTA call.
*   **Categories:** Visually separate grids (Laptops, Desktops, and Accessories). Clicking "Accessories" displays a polite "Coming Soon" modal to indicate catalog updates are in progress.
*   **Value Propositions:** Displays clear confidence signals including "3-Year UVU Care Warranty".

### 2. Catalog & Filters Flow (`src/app/accessories/page.tsx`)
*   Provides a search input querying names and descriptions in real-time.
*   Category tabs toggle between Laptops, Desktops, or All.
*   Interactive price slider filters products in real-time up to $3,000.
*   Dropdown selector sorts items: Featured, Price (Low-to-High or High-to-Low), or Highest Rated.

### 3. Product Detail Page Flow (`src/app/product/[id]/page.tsx`)
*   Loads detailed descriptions, price logs, highlights, and specifications tables dynamically based on the product `id`.
*   Includes an **interactive multi-view image gallery**. Users can select thumbnail views (front, back, side, top, zoom) to inspect hardware details closely.
*   Tracks warehouse stock status. Displays "Out of stock" warning alerts when stock runs out.

### 4. Interactive Checkout Flow (`src/app/cart/page.tsx`)
A multi-step setup guides the user safely through ordering:
1.  **Step 1: Cart Summary:** Users verify items, adjust order quantities, and view pricing breakdown (showing $0 Tax).
2.  **Step 2: Sign In / Create Account:** If the user is unauthenticated, they sign in or proceed.
3.  **Step 3: Shipping & Delivery Details:** Form inputs capture delivery addresses, contact numbers, and preferred shipping methods.
4.  **Step 4: Payment:** Supports mock Credit Card input validation or Institutional Purchase Orders.
5.  **Step 5: Confirmation:** Triggers cart clearance, updates database stock levels, generates order numbers, and displays a success animation.

### 5. Order History Tracking Flow (`src/app/orders/page.tsx`)
*   Presents a dashboard displaying all orders placed by the current user.
*   Displays timeline statuses using badges: `Processing` (Amber), `Shipped` (Blue), and `Delivered` (Green).
*   Allows the client to test status progressions or cancel a processing order.
*   Securely enforces the no-returns policy (reasons, buttons, and dialogues are fully hidden).

---

## 6. Setup & Running the Application Locally

To execute or share the codebase, run these standard terminal scripts in the root directory:

### Step 1: Install Dependencies
Downloads and registers Next.js 16, React 19, Tailwind CSS v4, and PostCSS dependencies:
```bash
npm install
```

### Step 2: Launch Development Server
Runs local host compiler. Open [http://localhost:3000](http://localhost:3000) to view:
```bash
npm run dev
```

### Step 3: Create Production Build
Validates strict type-checking, compiles source files, and exports statically optimized pages:
```bash
npm run build
```

### Step 4: Run Production Build Locally
Bootstraps the optimized production bundle server:
```bash
npm start
```

---

## 7. Crucial Implementation Details for Client Discussion
When presenting this codebase to your client, emphasize these key highlights:
1.  **React 19 & Next.js 16 Readiness:** The app is configured with the latest major frameworks, ensuring future-proof code that utilizes structural improvements like React Server Components and React Compiler logic.
2.  **No Flash of Light Theme:** In dark-mode-friendly apps, a white screen flash upon reload is a common bug. This codebase handles it instantly using optimized inline Javascript elements before DOM evaluation.
3.  **Persistent Experience:** Every feature runs entirely on the client-side but maintains data persistence. Even if users refresh or close the tab, their theme, login session, items in the cart, and orders remain saved.
4.  **Compliance with University Rules:** Fully respects special constraints like sales tax exemption (0% calculations) and a strict no-refunds policy.
