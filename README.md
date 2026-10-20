# SKYNET website — lamp and social section

The previous wood-desk lamp widget has been replaced with the owner's supplied skynet-lamp-section.html section. The articulated lamp, warm light pool, beam and floating network/social artwork are retained, with a responsive storefront integration.

## Live files

- site.html / index.html: storefront and lamp hero with text on the left and the scene on the right.
- lamp.js: supplied scene geometry/pose/light-reveal logic, real links, keyboard controls and visibility-aware animation.
- lamp.css: scoped section styling and separate mobile positions; no full-page scroll lock or fixed overlays.
- assets/lamp-logos/: five original embedded PNGs extracted without modification.
- assets/vendor/three-r128.min.js and THREE-r128-LICENSE.txt: local rendering dependency and license.
- app.js / styles.css: existing catalogue, plans, order flow, setup and support features.

There is no remote library or Spline dependency in the live page. The older React/Spline development files are inactive and not required for this section.

## Actual social destinations

The template's Facebook/Instagram/YouTube placeholders, sample phone number and sample Telegram link are replaced by existing SKYNET destinations:

- WhatsApp support: https://wa.me/94763813667
- Telegram support: https://t.me/skynet_int
- TikTok: https://www.tiktok.com/@skynet_int
- WhatsApp channel: https://whatsapp.com/channel/0029VbAh1gu3wtbAQf8seo0L
- Telegram channel: https://t.me/SkyNETCLOUD

Support/channel links have the correct icons and explicit labels; no new social profiles were invented. External links open in another tab. ISP logos jump to package results and search their provider name; SLT and Dialog include both relevant fixed/router and mobile categories.

## Interaction and responsive layout

Move the mouse anywhere on the page to aim; the lamp keeps tracking outside its hero column and keeps facing a stationary cursor. Touch also aims without blocking scrolling. Click/tap the lamp background to switch the light. Logo clicks follow the link without switching the lamp. The visible control buttons are removed. With the lamp focused, P pauses tracking and idle motion. Reduced-motion users start paused, and floating icons pause too. Hidden/offscreen scenes stop scheduling animation and hide their glow. Touch does not prevent normal vertical scrolling. Keyboard users can focus the section, use arrows/Home to aim and Space to switch the light. Focused logos highlight.

Desktop places the lamp to the right of the hero text. At 960px and below it stacks underneath the copy. Narrow desktop panels and phones share compact logo positions; scene height, logo sizes and labels adapt independently of the viewport, with at least 44px link targets. The section has no enclosing border. A pointer-transparent fixed viewport layer carries the soft light pool beyond the hero bounds without horizontal page overflow; the canvas beam fades smoothly at its edges. Labels and logos stay dim outside the light pool and brighten when illuminated or keyboard-focused. Without WebGL, links stay positioned, bright and usable, with a status message.

## Run and deploy

Run node serve.cjs (or npm run preview / start-site.ps1) from the project folder, then open http://127.0.0.1:5173/site.html . The preview uses correct script MIME types and disables local caching. No npm install or React build is needed for the live lamp.

Run ./package-site.ps1 to synchronize index.html and create skynet-site.zip. Upload ZIP contents, retaining your CNAME. Include the complete assets folder plus lamp.js and lamp.css. The synchronized Git copy is at G:/skynet support/github-publish; no commit/push runs automatically.

## Existing content

The 19 ISP rows retain owner-supplied data without independent price/compatibility verification. ISP and SKYNET fees are separate. Slash prices are unchanged and seven-day ISP validity is distinguished from monthly plans. SKYNET prices remain 100GB/Rs.200, 200GB/Rs.300, 300GB/Rs.400 and Unlimited/Rs.500 per month. Confirm conditions before payment.

The photo slider, provider strip, setup guides, troubleshooting, FAQ and WhatsApp/Telegram chooser are retained. Analytics uses the original property and does not treat contact clicks as sales.

## Verification

Tests passed the actual Three.js geometry and pose logic with a stub renderer: ten real destinations, all five provider searches, desktop/mobile positions, document-wide pointer tracking, stationary cursor persistence, glow outside the scene, keyboard light/pause and touch handling, reduced motion and useful WebGL fallback. Storefront regressions passed too. These checks validate code and interaction logic, not GPU rendering, final appearance or physical-phone performance. Browser visual verification remains unavailable in this session.

The Node preview helper uses only built-in modules and correct script MIME types; no npm installation is required to serve the already-built site. The optional Python helper remains available.

The lamp uses a brighter, slightly warm bulb, beam and spill light. Provider and social icons are dim outside the beam and reveal their brand colours when illuminated, and float slowly on staggered 12–18 second paths. Compact layouts spread them around the lamp with extra clearance. Hover/focus freezes the selected icon; reduced-motion and offscreen pauses remain active.
