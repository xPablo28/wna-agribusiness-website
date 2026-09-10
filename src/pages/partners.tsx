import { Scale, WhyWna } from "../sections/s06-model-pillars-scale";
import { Final, Partners } from "../sections/s08-partners-about-final";
import { PageHero } from "./page-hero";

/* ============================== PARTNERS ==============================
   Three doors in, the case for each, why WNA, and the enquiry form.
   The page ends on the single line the whole site works toward. */

export function PartnersPage() {
  return (
    <>
      <PageHero
        tone="pine"
        label="Partners"
        title="Who WNA works with."
        accentWords={["works with."]}
        lead="Producers, buyers and strategic partners each solve a different part of this — and each get something real back. Pick the door that fits; the enquiry form travels with you on this page."
        status="OPEN FOR CONVERSATIONS"
      />
      <Partners />
      <WhyWna />
      <Scale />
      <Final variant="compact" ctaHref="#enquiry" />
    </>
  );
}
