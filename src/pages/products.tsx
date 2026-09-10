import { Product, WhyMatters } from "../sections/s03-product-scope";
import { Final } from "../sections/s08-partners-about-final";
import { PageHero } from "./page-hero";

/* ============================== PRODUCTS ==============================
   What WNA works with — the honest framing: mango is the current focus,
   the product line is where the operation is heading. Nothing implied
   that is not confirmed. */

export function ProductsPage() {
  return (
    <>
      <PageHero
        label="Products"
        title="From surplus to ingredient."
        accentWords={["ingredient."]}
        lead="WNA turns surplus fruit into stable, spec-ready food ingredients. This page separates what is being built now from the wider product line it opens up — clearly, so partners always know where things stand."
      />
      <WhyMatters />
      <Product />
      <Final variant="compact" />
    </>
  );
}
