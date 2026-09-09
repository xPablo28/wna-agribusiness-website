import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { Loader } from "./components/Loader";
import { Nav } from "./components/Nav";
import { Hero, Problem } from "./sections/s01-hero-problem";
import { Operation, WhatWeDo } from "./sections/s02-system-operation";
import { Product, WhyMatters } from "./sections/s03-product-scope";
import { Destinations, Network } from "./sections/s04-destinations-network";
import { Intelligence, Vision } from "./sections/s05-vision-intelligence";
import { BusinessModel, Scale, WhyWna } from "./sections/s06-model-pillars-scale";
import { About, Final, Footer, Partners } from "./sections/s07-partners-about-final";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setReady(true)} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Problem />
        <WhatWeDo />
        <Operation />
        <Product />
        <WhyMatters />
        <Destinations />
        <Network />
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
