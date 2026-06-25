# FitMetricsHub - Core Documentation

Welcome to the **FitMetricsHub** workspace. FitMetricsHub is a high-performance, responsive, and content-rich Fitness & Nutrition Calculation Suite designed to empower users with precise health metrics, dynamic calculators, and scientifically-grounded clinical health guides.

---

## 🚀 Key Features

* **🧮 Interactive Core Calculators:** High-fidelity, dedicated tools for fundamental metabolic and physical measurements:
  * **BMI Calculator:** Standard Body Mass Index check.
  * **BMR Calculator:** Basal Metabolic Rate via Mifflin-St Jeor equation.
  * **Calorie Calculator:** Calculates daily maintenance calories based on activity tiers.
  * **Body Fat Calculator:** Navy tape-measure method for body fat estimations.
  * **Ideal Weight Calculator:** Formulas spanning Devine, Robinson, Miller, and Hamwi methods.
  * **Lean Body Mass Calculator:** Boer and Hume formula estimators.
  * **Macro Calculator:** Custom daily protein, fat, and carb ratios.
  * **Protein Calculator:** Goal-oriented daily amino-acid targets.
  * **Walking Calories Calculator:** MET-based burn calculation for walking speeds and grades.
  * **Water Calculator:** Hydration targets factoring in physical exercise.

* **⚙️ Expandable Dynamic Calculator Engine:** Allows declarative calculators (e.g., DOTS, Wilks, VO2 Max, Heart Rate Zones) to be loaded dynamically from unified JSON configurations without needing custom React component instances.

* **📚 Structured Health Guides Hub:** 20+ comprehensive, peer-reviewed fitness articles arranged in thematic clusters (e.g., *Weight Management*, *Body Composition*, *Nutrition*, *Performance*, *Hydration*) supporting FAQs, linked interactive calculators, and structured Tables of Contents.

* **🔍 Smart Search & Categorization Engine:** Real-time fuzzy-matched search across both calculators and guides, coupled with categorical filters and auto-generated breadcrumbs for a fluid, natural user flow.

* **🗺️ Automated Sitemap & Navigation:** Clear page index showcasing every tool and article on a single, clean overview page.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework:** React 18
* **Build System:** Vite
* **Type System:** TypeScript (strict mode enabled)
* **Styling Engine:** Tailwind CSS
* **Icons:** Lucide-React
* **Animations:** Framer Motion (for smooth component entering transitions and layout changes)

---

## 📂 Codebase Directory Layout

```
/
├── docs/                      # Technical Documentation
│   ├── read.md                # General introduction & setup guide
│   └── architecture.md        # Deep architectural design & data modeling
├── src/
│   ├── App.tsx                # Central entry routing and global layout
│   ├── main.tsx               # DOM mounter
│   ├── index.css              # Global Tailwind configuration and font injections
│   ├── types.ts               # Shared TypeScript type signatures and interfaces
│   │
│   ├── components/            # UI Components Directory
│   │   ├── Header.tsx         # Responsive main header
│   │   ├── Footer.tsx         # Comprehensive footer with copyright and sitemap link
│   │   ├── SearchBar.tsx      # Real-time autocomplete text input
│   │   ├── SearchAndCategoryPages.tsx # Category grids and fuzzy search views
│   │   ├── SitemapPage.tsx    # Live catalog directory mapping all active assets
│   │   ├── GuideView.tsx      # Dynamic markdown-rendered article page
│   │   ├── SEOOverview.tsx    # Dedicated SEO reporting & simulation dash
│   │   ├── calculators/       # Specialized React Calculator Components
│   │   └── ...
│   │
│   ├── data/                  # Content & Metric Configurations
│   │   ├── calculators.ts     # Combined listing of core & dynamic engines
│   │   ├── dynamic_calculators.ts # Config definitions for formula calculations
│   │   ├── guides.ts          # Consolidated guide repository
│   │   ├── guides_clusters.ts # Grouped articles
│   │   ├── phase2_calculators.ts # Extensible dynamic calculators configuration
│   │   └── phase2_guides.ts   # Extensible guides repository
│   │
│   └── utils/
│       └── markdown.ts        # Lightweight Markdown parser with FAQ / HTML supports
```

---

## 💻 Getting Started & Commands

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Development Mode
Run the high-speed Vite dev server:
```bash
npm run dev
```
*Note: The dev server automatically binds to host `0.0.0.0` and port `3000` inside our sandboxed environment.*

### 3. Production Build
Compile and bundle the React code:
```bash
npm run build
```
This command compiles TypeScript checks and bundles static files directly into the `/dist` directory.

### 4. Code Quality & Linting
Verify syntax validation and code consistency:
```bash
npm run lint
```
