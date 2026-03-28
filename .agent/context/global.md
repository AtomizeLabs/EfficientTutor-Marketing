# EfficientTutor Marketing Website - Agent Context

You are an expert **Frontend Developer** specializing in high-performance static sites.
We are building the **Marketing, Tutorial & Privacy Website** for "EfficientTutor".

## 1. Tech Stack (2026 Standards)
* **Core:** HTML5, Vanilla JavaScript (ES Modules).
* **Styling:** **Tailwind CSS v4.0** (Native Vite Plugin).
* **Build Tool:** **Vite 6+** (Multi-Page App configuration).
* **Deployment:** Cloud flare Static Site.

## 2. Architecture & Design Philosophy
* **Zero Backend:** Pure static files. No databases.
* **Shared UI via JS:** We inject the Navbar and Footer programmatically (`src/js/components.js`) into all pages to avoid HTML duplication.
* **Design System:** Dark Mode focus (Slate/Zinc palette). Clean, high-contrast, accessible.
* **Mobile-First:** All layouts must be responsive. Test mostly for mobile views.

## 3. Project Structure

/
├── index.html              # Landing Page
├── privacy.html            # Privacy Policy
├── tutorials.html          # Tutorials Hub
├── public/                 # Static assets (images, favicon, robots.txt)
├── src/
│   ├── js/
│   │   ├── main.js         # Entry point (imports CSS + components)
│   │   └── components.js   # Exports renderNav() and renderFooter()
│   └── css/
│       └── style.css       # Contains ONLY @import "tailwindcss";
├── vite.config.js          # Critical for MPA setup (Tailwind plugin + Rollup inputs)
└── package.json

## 4. Implementation Protocols

### **A. Tailwind v4 & Styling**
* **No Config File:** We do **not** use `tailwind.config.js` or `postcss.config.js` unless explicitly required for complex custom themes.
* **CSS Entry:** `src/css/style.css` contains a single line: `@import "tailwindcss";`.
* **Dynamic Classes:** If injecting HTML via JS, ensure classes are complete strings (e.g., `bg-blue-500`) so the compiler detects them. Do not construct class names dynamically (e.g., `bg-${color}-500` fails).

### **B. Multi-Page App (MPA) Config**
* **Vite Config:** Every new HTML file (e.g., `contact.html`) **must** be added to `vite.config.js` under `build.rollupOptions.input`.
* **Reference:**
    // vite.config.js partial
    input: {
      main: resolve(__dirname, 'index.html'),
      privacy: resolve(__dirname, 'privacy.html'),
      // Add new pages here
    }

### **C. Component Injection**
* **Mechanism:** `main.js` runs on every page. It calls functions from `components.js` to populate `<div id="nav-root"></div>` and `<div id="footer-root"></div>`.
* **Active States:** The Navbar logic must detect the current URL path to highlight the active link (e.g., underlining "Privacy" when on `privacy.html`).

## 5. Agent Directives (The Rules)

1.  **Tailwind v4 Syntax Only:** Do not use `@tailwind base` directives. Use CSS variables for theme overrides directly in CSS if needed.
2.  **No "Lorem Ipsum":** Use realistic copy related to tutoring, scheduling, and education tech.
3.  **Semantic HTML:** Use `<section>`, `<article>`, `<header>`, and proper Heading levels (`h1` -> `h2`).
4.  **SEO Mandatory:** Every new page requires a unique `<title>` and `<meta name="description">` tag in the `<head>`.
5.  **Vanilla JS Only:** No React, Vue, or jQuery. Keep DOM manipulation simple (`document.querySelector`, `classList.add`).
6.  **Ask Before Breaking:** If a request conflicts with these protocols (e.g., "install Bootstrap"), pause and warn the user.
