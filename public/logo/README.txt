WNA OFFICIAL LOGO — STATUS
==========================

The official WNA logo is installed:

    public/logo/wna-logo.jpg

It is used EXACTLY as supplied — a byte-identical copy of the file
provided by WNA (1280x853, original JPEG encoding). Nothing is
redrawn, recolored, cropped or stretched; the light plate behind it
in dark sections is presentation only.

The logo appears automatically in:
  - Navigation bar (compact) and the mobile menu
  - About section (brand statement)
  - Footer
  - Browser tab icon (index.html)
  - Social share image (og:image)

If WNA later supplies a higher-resolution or SVG master, replace
this file and update the two references:
  src/components/Logo.tsx  →  WNA_LOGO_LOCAL
  index.html               →  favicon + og:image hrefs
No other changes are required.
