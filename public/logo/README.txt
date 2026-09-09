WNA OFFICIAL LOGO — HOW THE SITE LOADS IT
==========================================

The website uses the official WNA logo EXACTLY as supplied.
Nothing is redrawn, recolored, cropped or stretched.

OPTION A — Save the file here (recommended)
  Put the official logo image in THIS folder as:

      wna-logo.png

  Full path:  public/logo/wna-logo.png
  (A white/off-white background is fine — the site presents it
  on a light plate. SVG is also supported: rename the reference
  in src/components/Logo.tsx if you prefer SVG.)

OPTION B — Hosted URL
  Host the logo anywhere public and paste the direct image URL
  into:  src/components/Logo.tsx  →  WNA_LOGO_REMOTE_URL = "https://…"

The logo then appears automatically in:
  - Navigation bar (compact) and the mobile menu
  - About section (brand statement)
  - Footer
  - Browser tab icon (index.html links /logo/wna-logo.png)
  - Social share image (og:image)

Until one of these is done, the site shows a neutral "WNA"
text badge in every placement (no artwork is invented, and the
"pending" note is only visible in development builds).
