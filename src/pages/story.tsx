import { Intelligence, Vision } from "../sections/s05-vision-intelligence";
import { Story } from "../sections/s07-impact-story";
import { About } from "../sections/s08-partners-about-final";
import { Final } from "../sections/s08-partners-about-final";
import { PageHero } from "./page-hero";

/* ============================== OUR STORY ==============================
   Origin → problem → question → people → vision. Human, honest:
   founder details arrive as labelled placeholders until confirmed. */

export function StoryPage() {
  return (
    <>
      <PageHero
        tone="pine"
        label="Our Story"
        title="Built by people who saw the loss."
        accentWords={["the loss."]}
        lead="WNA began with a simple, uncomfortable sight: fruit at its peak, and nowhere useful to go. This is the origin, the question it grew into, the people behind it, and where it is heading."
      />
      <About />
      <Story />
      <Vision />
      <Intelligence />
      <Final variant="compact" />
    </>
  );
}
