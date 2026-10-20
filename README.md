# SKYNET website

Responsive static HTML/CSS/JavaScript website with a black/grey theme, restrained blue actions, clear grouped navigation, network shortcuts, and Inter / Noto Sans Sinhala typography. No installation, database or framework build is required.

## Preview

Open `site.html` directly, or start a local server from this folder:

```powershell
python -m http.server 5174 --bind 127.0.0.1
```

Then open http://127.0.0.1:5174/ in your browser. Clipboard support works best on localhost or HTTPS.

## Files and updates

- `site.html`: editable page source.
- `index.html`: identical hosting entry point, refreshed by the packaging script.
- `styles.css`: dark theme and responsive layouts.
- `app.js`: package catalogue, SKYNET plans, setup guides, filters and order flow.
- `analytics.js`: original Google Analytics property and plan/package/contact click events. A contact click is not recorded as a completed purchase.
- `assets/skynet-logo.png`: original supplied logo, used without alteration.
- `site.original.html`: original website backup; do not upload this backup.

Edit `packages` and `plans` in `app.js` to change the catalogue and service prices. Contact links also appear in `site.html` and `app.js`.

## Package information

All 19 catalogue rows use the owner's supplied package list. Combined Flash options, slash prices and Airtel package numbers remain grouped as supplied. ISP prices and compatibility have not been independently verified. A slash price is not assigned an invented validity period. Unknown prices are not treated as zero. Single-price totals add one listed ISP activation to one SKYNET monthly plan; they are not a recurring monthly bill estimate. Seven-day packages show a separate validity warning.

The four SKYNET prices are retained from the original website: 100GB/Rs.200, 200GB/Rs.300, 300GB/Rs.400 and Unlimited/Rs.500, each for one month.

## Hosting

Run `./package-site.ps1` after editing to synchronize `index.html` and create `skynet-site.zip`. Upload the ZIP contents to your static web host's public directory. Keep the `assets` folder next to the HTML files. No Node.js hosting is needed.

After selecting a real domain, configure its canonical URL, absolute social preview image URL and provider-specific HTTPS/security headers on that host. These have not been invented for the local preview.

## Features

- Responsive dark design, original brand logo, anchor navigation and mobile action bar.
- Seven network filters, search, sorting, result counts and resettable empty state.
- Package selection carried into the order dialog; exact plan, network and device in the WhatsApp draft.
- Separate ISP and SKYNET costs, speed/quota/old-SIM warnings and uncertain-price handling.
- Copyable order summary for Telegram. The customer sends the message themselves.
- Device setup tabs with keyboard navigation; mobile menu; native dialog with Escape dismissal and focus restoration.
- Troubleshooting selector, support message drafts, FAQ and original social channels.

This is a storefront with customer-initiated chat ordering. It does not process payments, issue configs, measure server latency, monitor live ISP compatibility or create customer accounts. Refund, activation and usage conditions must be confirmed with support.

## Verification

JavaScript syntax checked with Node. Browser checks covered all 19 initial package rows, Airtel and old-SIM filtering, empty-state reset, package-to-plan selection, precise/uncertain order costs, seven-day warnings, generated WhatsApp drafts, copy summary, Escape dismissal, setup tabs and keyboard switching. Desktop and narrow mobile layouts were visually inspected; mobile horizontal overflow was checked. External chats were not sent and payments were not made.

The later blue/glass theme update passed static CSS structure, font import, colour replacement and packaging checks. Browser access for this later styling pass was blocked by the preview tool, so its updated visual appearance has not been browser-verified. `preview-desktop.jpg` shows the earlier green theme.

Latest design revision: black and grey surfaces replace the blue glass styling. The decorative hero illustration is replaced with seven functional network shortcuts. Mobile plans use one readable card per row. Navbar labels and active state are clearer. Current static checks cover HTML anchors/assets, shortcut network IDs, CSS structure, JavaScript syntax and the deployment archive. Browser verification of this design revision is unavailable because preview-tool access was blocked. Earlier screenshots do not show the current revision.

Rounded-shape update: pill buttons and desktop navigation, rounded content cards, search input, device controls, modal and mobile menu. Black/grey colours and blue accents are retained.


## Mobile and image-slider update (2026-10-20)

The network selector now sits below the hero/provider strip, ahead of the catalogue. Its shortcuts filter the catalogue and jump to the results heading. The hero uses three illustrative generated photo scenes (one local image asset) with next/previous, dots, pause, keyboard and touch-swipe controls. Autoplay pauses on focus, mouse hover, document hiding and reduced motion. Photos illustrate usage and are not images of SKYNET facilities.

Provider logos come from each provider's official site and retain their original colours on neutral white tiles. See `assets/isp/SOURCES.md`. SLT and Mobitel currently serve the same combined SLT-Mobitel logo; the captions distinguish fixed and mobile service. Logos identify package providers and do not indicate a partnership.

The dark background and rounded shapes are retained, with restrained blue/purple/white heading colours. Mobile filters use four columns / two rows. Package cards use two columns on screens at least 360px wide and one column below 360px. Longer notes expand under Package details; limits and restrictions remain visible. Controls, input font sizes, modal scrolling, bottom safe areas and setup/support layouts have been adjusted for mobile.

Current verification: a real JSDOM DOM run passed catalogue filtering, search/reset, new network shortcuts, carousel navigation/dots/keyboard/autoplay/pause, reduced-motion mode, order drafts and costs, seven-day and old-SIM warnings, setup tabs and menu interactions. Static checks verified source/image/asset integrity, anchors and stylesheet structure. These checks do not replace visual layout testing: current browser preview access remains unavailable, so the latest responsive appearance has not been visually browser-verified. No Git commit or push was made for this update.
