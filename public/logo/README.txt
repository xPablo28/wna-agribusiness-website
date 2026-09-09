WNA OFFICIAL LOGO — HOW THE SITE LOADS IT
==========================================

The website uses the official WNA logo EXACTLY as supplied.
Nothing is redrawn, recolored, cropped or stretched.

Chat attachments do not reach the project files, so the
artwork must arrive one of two ways:

OPTION A — Save the file here
  Save the official logo image in THIS folder as:

      wna-logo.png

  Full path:  public/logo/wna-logo.png
  (The white/off-white background is fine.)

OPTION B — Hosted URL
  Host the logo anywhere public (your website, Drive share
  link, Imgur, Cloudinary…) and paste the direct image URL into:

      src/components/Logo.tsx  →  WNA_LOGO_REMOTE_URL = "https://…"

The logo then appears automatically in:
  - Navigation (compact) + mobile menu
  - Loading screen (large, glow + float)
  - About section (brand statement)
  - Final statement section (large, glow + float)
  - Footer
  - Browser tab icon + social share image (og:image)

Until one of these is done, a small neutral "WNA" pending
badge is shown in those placements.
