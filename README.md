# Robyn's Realty

Robyn Buckwalter's real estate site (Orb Agency, task 101).

Branch `rebuild/webflow-export`: her original Webflow site, exported 2026-11-13 and cleaned up. Robyn asked to keep the original design and photos, take off the dark layers over the photos, and add new pages.

- Static HTML, no build step. Pages: `index.html`, `about.html`, `buy.html`, `sell.html`, `contact.html`, `resources.html`, `give-back.html`, `charity.html`, featured listings `1977391.html` and `1978153.html`, `404.html`.
- `css/robyn-buckwalter.webflow.css`: the Webflow export, with the dark overlay layers removed from photo backgrounds.
- `css/robyns-cleanup.css`: our changes on top (light shade only behind text, page loads at the top).
- `vercel.json`: clean URLs, so `/about` serves `about.html` like the old site.
- `assets/`: Robyn's new logo files (not used on these pages yet).

- `buyers-guide.html`, `sellers-guide.html`: Robyn's buyer and seller guides as web pages, copy from her own guide docs (Oct 6, 2026 emails). Styles in `css/guides.css`. Linked from the Resources download blocks.

Forms: `js/forms.js` sends every form (contact, sell, guide downloads, featured listings) to Web3Forms, which emails robynsrealty@gmail.com. Set `ACCESS_KEY` in that file to her Web3Forms key; until it is set the script does nothing.

Design system and directions: https://www.figma.com/design/SMpVfFgGmq0HPg9ypMFpfC/Robyn-Buckwalter
