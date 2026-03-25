# EfficientTutor Marketing Website

This is the official marketing, tutorial, and privacy policy website for **EfficientTutor**. It serves as the public-facing portal for the platform, designed to be fast, SEO-friendly, and visually cohesive with the main application's dark mode aesthetic.

## 🚀 Project Overview

This project is a high-performance **Static Site** built with modern web standards. It prioritizes speed, accessibility, and maintainability by avoiding heavy frameworks in favor of a lean "Multi-Page App" (MPA) architecture.

### Key Features
*   **Zero-Backend Architecture:** Pure static files for ultra-fast loading and easy hosting.
*   **Modern Dark UI:** A refined Slate/Zinc dark theme powered by Tailwind CSS v4.
*   **Component Injection:** Shared Navbar and Footer are injected via Vanilla JavaScript to eliminate HTML duplication across pages.
*   **Responsive Design:** Mobile-first layout that adapts seamlessly to all screen sizes.
*   **SEO Optimized:** Unique meta tags, titles, and semantic HTML for every page.
*   **Tutorials Hub:** A dedicated section for guides and resources.

## 🛠️ Tech Stack

*   **Core:** HTML5, Vanilla JavaScript (ES Modules)
*   **Styling:** [Tailwind CSS v4.1+](https://tailwindcss.com/) (via native Vite plugin)
*   **Build Tool:** [Vite 7+](https://vitejs.dev/) (configured as an MPA)
*   **Deployment:** Cloudflare Pages (Static Site)

## 💻 Local Development

Follow these steps to run the project on your machine.

### Prerequisites
*   Node.js (v18 or higher)
*   npm (installed with Node.js)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd EfficientTutor-Marketing
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Dev Server
Start the local development server with hot module replacement (HMR):
```bash
npm run dev
```
Open your browser to `http://localhost:5173` (or the port shown in your terminal).

### Building for Production
To create an optimized production build (minified HTML, CSS, and JS):
```bash
npm run build
```
The output will be generated in the `dist/` folder.

### Previewing the Build
To test the production build locally before deploying:
```bash
npm run preview
```

## 🌐 Deployment (Cloudflare Pages)

This project is configured for seamless deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

### Deployment Settings
*   **Framework Preset:** `Vite`
*   **Build Command:** `npm run build`
*   **Build Output Directory:** `dist`
*   **Node.js Version:** `18+`

## 📁 Project Structure

```text
/
├── index.html              # Landing Page
├── contact.html            # Contact & Support Page
├── privacy.html            # Privacy Policy
├── tutorials.html          # Tutorials Hub
├── public/                 # Static assets (logo.png, robots.txt, sitemap.xml)
├── src/
│   ├── js/
│   │   ├── main.js         # Entry point (imports CSS + injects components)
│   │   └── components.js   # HTML strings for Navbar & Footer
│   └── css/
│       └── style.css       # Tailwind CSS entry point (@import "tailwindcss")
├── vite.config.js          # Vite MPA configuration
└── package.json            # Dependencies and scripts
```

## 📄 License

© 2026 AtomizeLabs. All rights reserved.
