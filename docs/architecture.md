# FitMetricsHub - System Architecture

This document describes the architectural layout, routing model, component structure, data representations, and performance patterns governing the **FitMetricsHub** application.

---

## 🏛️ Architectural Overview

FitMetricsHub is structured as a client-side Single Page Application (SPA) powered by **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is fully self-contained and manages state, dynamic routing, layout rendering, and mathematical formulas client-side.

```
+--------------------------------------------------------------+
|                         App.tsx                              |
|   (Main Router, Global Header/Footer, Active Page State)     |
+------------------------------+-------------------------------+
                               |
        +----------------------+-----------------------+
        |                                              |
        v                                              v
+------------------------------+             +-----------------+
|     Calculators/Guides Hub   |             |    SEO Utility  |
| - Homepage (Bento Grid)      |             |  - Simulates    |
| - Calculators Page           |             |    metadata &   |
| - Guides Page                |             |    headings     |
| - Category Discovery Page    |             +-----------------+
| - Sitemap Page               |
+------------------------------+
```

---

## 🚦 State-Based Routing

Rather than relying on heavier, external client-side routing libraries, FitMetricsHub leverages a lightweight, centralized state router inside `src/App.tsx`. This avoids bundle overhead and ensures instant rendering.

### 1. View Representation
The active page is governed by the `activeTab` or path parameters stored in simple React states:
- `home`: The high-impact landing page featuring search controls and bento categories.
- `calculators`: The full database catalog showing all calculators.
- `guides`: The central directory for health, fitness, and nutrition guides.
- `calculator:[slug]`: A specialized layout that mounts either a core calculator component or evaluate a dynamic meta-calculator.
- `guide:[slug]`: A markdown rendering page showcasing the requested guide.
- `category:[name]`: Filtered grids containing all materials matching a fitness cluster.
- `search`: A live query match result panel.
- `sitemap`: Index mapping of all links.
- `seo-report`: System diagnostics page reviewing title tags, FAQs, and link counts.

### 2. Hash & Back-Button Integration
To maintain high user satisfaction, the router synchronizes state with browser history. Triggering back actions or clicking standard deep links updates the tab and smoothly scrolls the user to the top.

---

## 📊 Data Modeling & TypeScript Definitions

Strict interfaces are maintained in `src/types.ts` to ensure comprehensive compile-time checks:

### 1. Calculators (`CalculatorConfig`)
Represents the structural metadata of a calculator:
```typescript
export interface CalculatorConfig {
  id: string;
  name: string;
  shortDescription: string;
  metaDescription: string;
  category: 'Weight Management' | 'Body Composition' | 'Nutrition' | 'Performance' | 'Hydration';
  isDynamic: boolean; // True if powered by metadata fields, False if custom component
  relatedSlugs: string[]; // Connected tools
  relatedGuideSlugs: string[]; // Connected reading material
}
```

### 2. Guides (`GuideArticle`)
Defines a structured editorial asset:
```typescript
export interface GuideArticle {
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  toc: { id: string; text: string }[]; // Table of Contents
  content: string; // Markdown body
  faqs: { id: string; question: string; answer: string }[];
  relatedCalculators: string[];
}
```

---

## 🧮 Calculator Execution Models

Our system employs a hybrid structure for mathematical and physical calculations:

### 1. Core Native Calculators
Located in `src/components/calculators/`. Highly customized calculators requiring unique inputs or graphic visualizers (e.g., body fat tape measures, detailed calorie macros, custom gauge charts) are implemented as native React components using dedicated modular styles.

### 2. Dynamic Declarative Engine
Located in `src/data/dynamic_calculators.ts` and `src/data/phase2_calculators.ts`. It allows configuring calculators using simple field schemas. 
* **Field Schema:** Defines input metrics (`number`, `select`, `checkbox`, `radio`) with default boundary thresholds, tooltips, and units.
* **Math Evaluator:** Processes the inputs through safe, pre-compiled JavaScript functions to output precise results, displaying responsive charts or detailed sub-metrics on successful submissions.

---

## 📝 Custom Markdown Rendering

To support clean formatting without dragging in extensive third-party package dependencies, the system utilizes a custom parser located at `src/utils/markdown.ts`. It securely parses typical Markdown patterns into standard JSX:
* Heading layers (`#`, `##`, `###`) are mapped to beautifully styled typography.
* Bullet lists (`*`, `-`) are mapped to padded, responsive block elements.
* Bold text (`**`) is styled using high-contrast color tones.
* FAQ nodes and dynamic anchors are automatically resolved to support local anchor jumps from the interactive Table of Contents.

---

## 🎨 Visual System & Tailwind Styling

* **Typography:** Core headings are styled with tracking-tight styles and paired with JetBrains Mono for output cards, gauges, and index charts.
* **Bento Grid Layout:** Home elements are grouped in responsive grid tiles featuring micro-transitions, hovering state lifts, and clean border divisions.
* **Color Palette:** Professional Slate & Teal/Emerald accent styles are implemented globally with clean negative space layout structures.
