# Content Manager Guide: Tutorials

The EfficientTutor Tutorials Hub is powered by a **Headless CMS**. This allows the marketing team to manage tutorials through a visual interface without touching code.

## 🚀 How to Access the Admin Panel
1. Go to `https://info.efficienttutor.com/admin/`
2. Click **"Login with GitHub"**.
3. You will see a dashboard with a **"Tutorial Topics"** collection.

---

## 🏗️ Data Source
All content is stored in `public/data/tutorials.json`. When you save changes in the admin panel, the CMS automatically updates this file and triggers a new deployment.

---

## 🏗️ Structure (The "Racks")

### 1. Topic Section
Each "Topic" represents a horizontal rack of tutorials (e.g., Onboarding).
- **Topic ID**: A unique slug (e.g., `zoom-app`).
- **Icon**: A Heroicon SVG string.
- **Tutorials**: A list of specific guides within this topic.

### 2. Individual Tutorial
- **ID**: Unique identifier (e.g., `connect-zoom`).
- **Videos**: Provide both **Desktop** and **Mobile** YouTube IDs.
- **Steps**: A list of instructions for the user.
- **Related IDs**: (Optional) Add IDs of other tutorials to appear in the "What's Next" section.

---

## 🛠️ Technical Details (For Developers)
- **Data Fetching**: `src/js/components.js` calls `fetch('/data/tutorials.json')`.
- **CMS Config**: `public/admin/config.yml` defines the form fields.
- **MPA Config**: Vite automatically discovers the `/admin/index.html` thanks to the auto-discovery script in `vite.config.js`.

## 💡 Best Practices for Marketing
- **Video Format**: YouTube Shorts (9:16) are preferred for the vertical player.
- **SVG Icons**: Copy the "SVG" from [Heroicons](https://heroicons.com/) and paste it into the Icon field.
- **Internal Linking**: Use the exact `id` of a tutorial in the `Related IDs` list to link guides together.
