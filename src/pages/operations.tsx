import { Operation } from "../sections/s02-system-operation";
import { Network } from "../sections/s04-destinations-network";
import { BusinessModel } from "../sections/s06-model-pillars-scale";
import { Impact } from "../sections/s07-impact-story";
import { Final } from "../sections/s08-partners-about-final";
import { PageHero } from "./page-hero";

/* ============================== OPERATIONS ==============================
   The current operation in detail — mango in, value out. The full journey,
   the coordination network, the business model, and why it matters. */

export function OperationsPage() {
  return (
    <>
      <PageHero
        label="Operations"
        title="The operation, stage by stage."
        accentWords={["stage by stage."]}
        lead="This is WNA today — from surplus mango at the source to a dried, packaged ingredient delivered to the right buyer. Walk the full line below."
      />
      <Operation />
      <Network />
      <BusinessModel />
      <Impact />
      <Final variant="compact" />
    </>
  );
}
