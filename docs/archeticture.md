# System Architecture Documentation

This file was created to accommodate the alternative spelling (`archeticture.md`). 

The fully detailed, comprehensive technical architecture guidelines and system charts have been compiled in the main document:

👉 **[Go to System Architecture Guide (architecture.md)](./architecture.md)**

---

## Quick Architecture Summary

* **Framework:** React 18 with Vite.
* **Styling:** Tailwind CSS with responsive design principles.
* **State Management:** Centralized client-side routing state built inside `App.tsx`.
* **Dynamic Calculators:** Formulations and calculators defined dynamically via metadata files in `src/data/dynamic_calculators.ts` and `src/data/phase2_calculators.ts`.
* **Educational Library:** Highly-structured articles split into cluster data groups, rendered safely with our custom-built markdown processor in `src/utils/markdown.ts`.
