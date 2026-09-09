import { MotionConfig } from "framer-motion";
import { Nav } from "./components/Nav";
import { Hero, Problem } from "./sections/s01-hero-problem";
import { BigQuestion, Operation, WhatWeDo } from "./sections/s02-system-operation";
import { Product, WhyMatters } from "./sections/s03-product-scope";
import { Destinations, Network } from "./sections/s04-destinations-network";
import { Intelligence, Vision } from "./sections/s05-vision-intelligence";
import { BusinessModel, Scale, WhyWna } from "./sections/s06-model-pillars-scale";
import { Impact, Story } from "./sections/s07-impact-story";
import { About, Final, Footer, Partners } from "./sections/s08-partners-about-final";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <BigQuestion />
        <WhatWeDo />
        <Operation />
        <WhyMatters />
        <Product />
        <Destinations />
        <Network />
        <Impact />
        <Story />
        <Vision />
        <Intelligence />
        <BusinessModel />
        <WhyWna />
        <Scale />
        <Partners />
        <About />
        <Final />
      </main>
      <Footer />
    </MotionConfig>
  );
}
