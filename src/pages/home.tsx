import { Hero, Problem } from "../sections/s01-hero-problem";
import { Operation, WhatWeDo } from "../sections/s02-system-operation";
import { Impact } from "../sections/s07-impact-story";
import { Final } from "../sections/s08-partners-about-final";

/* ============================== HOME ==============================
   The introduction — the story in brief. Every block reaches deeper:
   Explore Our Approach, View Operations, Meet the Founders, Work With WNA. */

export function HomePage() {
  return (
    <>
      <Hero />
      <Problem variant="teaser" />
      <WhatWeDo deepLink />
      <Operation variant="preview" />
      <Impact variant="home" />
      <Final />
    </>
  );
}
