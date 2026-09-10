import { motion, MotionConfig } from "framer-motion";
import { useEffect, type ReactElement } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./sections/s08-partners-about-final";
import { ApproachPage } from "./pages/approach";
import { HomePage } from "./pages/home";
import { OperationsPage } from "./pages/operations";
import { PartnersPage } from "./pages/partners";
import { ProductsPage } from "./pages/products";
import { StoryPage } from "./pages/story";
import { PAGE_TITLES, useRoute } from "./router";

/* ------------------------------------------------------------------
   WNA — Waste Not Agro Solutions.
   Six purposeful pages, hash-routed (see src/router.tsx):

     #/            Home — the introduction
     #/approach    The idea in full
     #/operations  The mango line, end to end
     #/products    Current focus vs future line
     #/story       Origin, people, vision
     #/partners    Three ways in + enquiry

   All copy lives in the sections/pages; all facts and placeholders
   are configured in src/data.ts.
------------------------------------------------------------------- */

const PAGES: Record<string, () => ReactElement> = {
  "/": HomePage,
  "/approach": ApproachPage,
  "/operations": OperationsPage,
  "/products": ProductsPage,
  "/story": StoryPage,
  "/partners": PartnersPage,
};

export default function App() {
  const route = useRoute();
  const Page = PAGES[route] ?? HomePage;

  /* Per-page document title, and a fresh top on every navigation. */
  useEffect(() => {
    document.title = PAGE_TITLES[route];
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [route]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <motion.div
          key={route}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Page />
        </motion.div>
      </main>
      <Footer />
    </MotionConfig>
  );
}
