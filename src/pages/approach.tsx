import { Problem } from "../sections/s01-hero-problem";
import { BigQuestion, WhatWeDo } from "../sections/s02-system-operation";
import { Destinations } from "../sections/s04-destinations-network";
import { Final } from "../sections/s08-partners-about-final";
import { PageHero } from "./page-hero";

/* ============================== OUR APPROACH ==============================
   The idea in full: the problem behind the problem, the question,
   Grade → Match → Utilize, and how every batch finds its destination. */

export function ApproachPage() {
  return (
    <>
      <PageHero
        tone="pine"
        label="Our Approach"
        title="When abundance becomes loss."
        accentWords={["loss."]}
        lead="A good harvest is only half the story. Our approach starts where the harvest ends — at the moment surplus either finds its next use or disappears. Then comes the system that decides: grade, match, utilize."
      />
      <Problem variant="full" />
      <BigQuestion />
      <WhatWeDo showTag />
      <Destinations />
      <Final variant="compact" />
    </>
  );
}
