WNA OFFICIAL LOGO — INSTALLATION NOTES
======================================

Files in this folder
--------------------
wna-logo.jpg   The official logo artwork, EXACTLY as supplied by WNA.
               Byte-identical copy of the source file (MD5 verified):
               never redrawn, recolored, cropped or stretched.
               Used as-is for the favicon and social share image
               (opaque contexts), and as the Logo component's fallback.

wna-logo.png   SAME pixels as wna-logo.jpg. Created by a programmatic
               background-field key only: the flat #f7f7f7 surrounding
               field was set to transparency so the mark can sit directly
               in the navigation without a white card. The artwork
               itself was not modified (no redraw, no recolor, no crop,
               no AI regeneration). This is the file the site displays.

Site display order (src/components/Logo.tsx)
--------------------------------------------
1. /logo/wna-logo.png   (transparent integration)
2. /logo/wna-logo.jpg   (fallback if the PNG is removed)
3. WNA_LOGO_REMOTE_URL  (optional — set a public URL in Logo.tsx)

Presentation
------------
No plate, no shadow, no card. On dark surfaces the logo's own bright
greens/amber carry it; on cream sections the removed field blends
seamlessly. Aspect ratio (1280x853) is always preserved via
object-contain sizing.

If WNA later supplies a native transparent file (PNG/SVG):
1. Save it as public/logo/wna-logo.png (replacing the derived copy).
2. No code change needed — Logo.tsx already loads that path first.
