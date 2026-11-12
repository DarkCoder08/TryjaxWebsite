# Tryjax Construction Website — Site Documentation

> This document is the primary reference for the Tryjax Construction static website. It is written primarily for AI agents working on this codebase, but may also serve as human-facing documentation in the future.

---

## 1. Project Overview

| Property | Value |
|----------|-------|
| **Site Name** | Tryjax Construction |
| **Type** | Static multi-page website (no backend, no framework) |
| **Pages** | 8 (`index.html`, `about.html`, `apartments-hotels.html`, `ready-to-rent.html`, `scans.html`, `mural.html`, `contact.html`, `careers.html`) |
| **Stylesheet** | 1 shared file (`style.css`) |
| **JavaScript** | 2 shared files (`theme.js`, `hours.js`) |
| **External Dependencies** | Google Model Viewer (`model-viewer` v4.3.0) — loaded via CDN as ES module |
| **Theming** | CSS custom properties with light/dark toggle via `data-theme` attribute |
| **Responsive** | Yes, single breakpoint at `768px` |

### Directory Structure

```
TryjaxWebsite/
├── index.html          # Home page (hero, 3D model viewer, alternating content rows, partners carousel)
├── about.html          # About page (hero, team grid, clients grid)
├── apartments-hotels.html # Apartments & Hotels page (hero, What We Build, Ready to Rent feature band, How It Works, team)
├── ready-to-rent.html # Ready to Rent page (hero, flat pricing table, feature band, FAQ, team)
├── scans.html          # 3D Scans page (hero, 3D model viewer, benefits, partner showcase, process steps)
├── mural.html          # Murals page (hero, feature cards, 6-photo mural gallery, CTA)
├── contact.html        # Contact page (hero, contact info cards, contact form)
├── careers.html        # Careers page (hero, why TryJax, hiring focus, opportunities, values, how to apply, work samples, trade partner, CTA)
├── style.css           # Shared stylesheet (all styles, theming, responsive)
├── theme.js            # Theme manager (dark mode toggle, persistence, system detection)
├── hours.js            # Timezone-aware business hours converter (all pages)
├── HDR/
│   └── tree_lined_driveway_1k.hdr   # HDR environment map for 3D model lighting
├── Images/
│   ├── Favicon.png     # Site favicon
│   ├── hero-bg.jpg                        # Hero section background image
│   ├── iris-logo.png                      # IRIS partner company logo (original)
│   ├── irisLogoTransparent.png            # IRIS logo for dark mode (transparent bg)
│   ├── irisLogoTransparentInverted.png    # IRIS logo for light mode (inverted, transparent bg)
│   ├── Logo.jpeg                          # Placeholder logo used in team/client cards
│   └── LogoText.png                       # Logo used in header navigation
├── Models/
│   └── Cube.glb        # 3D model for model-viewer component
└── plans/
    ├── dark-mode-implementation-plan.md
    └── site-documentation.md       # This file
```

### Known Inconsistencies

- **Sample files:** `apartments-hotels-sample.html` and `ready-to-rent-sample.html` are superseded guidelines left in the repo root. They are not linked from any page, not listed in `sitemap.xml`, and are not part of the live site.

---

## 2. Page Reference

### 2.1 [`index.html`](index.html) — Home Page

**Title:** `Tryjax Construction`

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Header | `<header>` | Shared header with logo image + nav links + theme toggle button |
| 2 | Hero | `#home.hero` | Full-width background image (`hero-bg.jpg`) with overlay. Contains H1 tagline, subtitle paragraph, and CTA `.btn` linking to `contact.html` |
| 3 | 3D Model Viewer | `#model-viewer.section` | Contains a `<model-viewer>` element displaying `Models/Cube.glb` with HDR environment lighting. Features camera controls, auto-rotate, and custom camera orbit |
| 4 | What We Do | `.section.bg-light` | Alternating image-text layout using `.content-row` blocks. Four rows total, alternating left-image and right-image (via `.reverse` class). Covers: Ground Up Construction, National Development, Renovation and Remodeling, and Custom Murals — the "Custom Murals" row's H2 is an anchor linking to `mural.html` (styled via `.content-text h2 a` in `style.css`). That row's image column is a CSS gradient placeholder (`.content-image-placeholder`, matching the `.mural-tile` gallery aesthetic on `mural.html`) until real installation photography exists; it is sized identically to the sibling `.content-image img` boxes |
| 5 | Coverage Area (Map) | `#coverage-area.section` | Section displaying a US map (`Images/Blank_US_Map_(states_only).webp`) inside a `<figure class="map-figure">` wrapper. Includes descriptive subtitle mentioning 41 states of coverage. Image uses `loading="lazy"`, `decoding="async"`, and explicit `width`/`height` attributes for performance and CLS prevention |
| 6 | Partners Logos | `#partners.section.partners-section` | Infinite horizontal scrolling carousel of partner logos using pure CSS animation. Contains heading, subtitle, and a `.partners-track-wrapper` with edge-fade mask. Two identical sets of 8 `.partner-logo` items create a seamless loop via `translateX(-50%)` keyframe animation. Pauses on hover. Respects `prefers-reduced-motion` |
| 7 | Footer | `<footer>` | Multi-column footer with Navigation links, Contact info, Business Hours (dynamic via `hours.js`), and copyright bottom bar |

**Special Notes:**
- This is the only page that loads the `model-viewer` ES module from Google CDN
- Uses `100dvh` dynamic viewport height on the body

---

### 2.2 [`about.html`](about.html) — About Page

**Title:** `About Us - Tryjax Construction`

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Header | `<header>` | Same shared header as index |
| 2 | Hero | `#home.hero` | Page title "About Us" with subtitle. Uses same `hero-bg.jpg` background |
| 3 | About Text | `#about.section` | Short company description paragraph |
| 4 | Team | `#team.section.bg-light` | Team member grid using `.team-grid` (3 columns, auto-fit). Each `.team-card` has a circular avatar image, name, role, and bio |
| 5 | Clients | `#clients.section` | Client logo grid using `.clients-grid`. Six `.client-card` items with hover lift effect |
| 6 | Footer | `<footer>` | Same shared multi-column footer |

---

### 2.3 [`contact.html`](contact.html) — Contact Page

**Title:** `Contact Us - Tryjax Construction`

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Header | `<header>` | Same shared header |
| 2 | Hero | `#home.hero` | Page title "Get In Touch" with subtitle |
| 3 | Contact Info | `#contact-info.section` | Two `.service-card` items in a `.services-grid` displaying Business Hours (dynamic timezone-adjusted hours + adjustment note via `hours.js`) and Email information |
| 4 | Contact Form | `#contact-form.section.bg-light` | Form inside `.form-container`. Fields: Full Name, Email, Phone, Subject (two per `.form-row`), Message (full-width textarea). Submit button uses `.btn.submit-btn` classes |
| 5 | Footer | `<footer>` | Same shared multi-column footer |

---

### 2.4 [`scans.html`](scans.html) — 3D Scans Page

**Title:** `3D Scanning - Tryjax Construction`

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Header | `<header>` | Same shared header with "Scans" nav link |
| 2 | Hero | `#home.hero` | Page title "3D Scanning" with subtitle |
| 3 | 3D Model Viewer | `#model-viewer.section` | `<model-viewer>` element displaying `Models/Cube.glb` with HDR lighting. Same configuration as home page. Includes "Explore 3D Scans" heading |
| 4 | Benefits | `#benefits.section.bg-light` | Three `.service-card` items in `.services-grid` covering: Pinpoint Accuracy, Faster Project Timeline, Seamless Franchise Fit |
| 5 | Partner Company | `#partner.section` | Centered `.partner-showcase` section featuring two theme-switched IRIS logos (`Images/irisLogoTransparentInverted.png` in light mode, `Images/irisLogoTransparent.png` in dark mode) and partnership description. Uses `.iris-logo-light` / `.iris-logo-dark` CSS classes toggled by `[data-theme]` attribute |
| 6 | 3D Imaging Process | `#process.section.bg-light` | Alternating `.content-row` blocks (four rows, alternating left-image and right-image via `.reverse` class). Covers: On-Site Scan, Data Processing, Model Review, Build & Deliver |
| 7 | Footer | `<footer>` | Same shared multi-column footer |

**Special Notes:**
- This page loads the `model-viewer` ES module from Google CDN (same as `index.html`)

**Special Notes:**
- Form has no `action` attribute — currently a static/placeholder form with no backend integration
- No form validation JavaScript exists

---

### 2.5 [`mural.html`](mural.html) — Mural Services Page

**Title:** `Custom Murals - Tryjax Construction`

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Header | `<header>` | Same shared header, including the "Murals" nav link |
| 2 | Hero | `#home.hero` | Page title "Custom Murals" with subtitle "Full turnkey wall graphics for commercial spaces — designed, printed, and installed by Tryjax." No CTA button (matches the `about.html` / `scans.html` heroes). Uses the same `hero-bg.jpg` background |
| 3 | Key Selling Points | `#features.section.bg-light` | Heading "Why Choose Tryjax Murals" with three `.service-card` items in a `.services-grid` (card copy below) |
| 4 | Mural Gallery | `#gallery.section` | Heading "Mural Gallery" + inline-styled centered subtitle ("A selection of our work. Full installation photography is coming soon."). Six tiles (`.mural-tile mural-tile-1` … `.mural-tile-6`) in a `.mural-gallery` grid. All six tiles hold real photos: `<img src="Images/Mural_1.JPG">` in `.mural-tile-1`, `<img src="Images/Mural_2.JPG">` in `.mural-tile-2`, and `<img src="Images/Mural_3.webp">` through `<img src="Images/Mural_6.webp">` in `.mural-tile-3` … `.mural-tile-6` (all with meaningful alt text and `loading="lazy"`) — constrained by the `.mural-tile img` CSS rule (`display: block; width: 100%; height: 100%; object-fit: cover;`). No placeholder tiles remain in the gallery |
| 5 | CTA | `#cta.section.bg-light` | Centered H2 "Ready to Bring Your Walls to Life?", paragraph, and a `.btn` "Get a Quote" linking to `contact.html` |
| 6 | Footer | `<footer>` | Same shared multi-column footer, including the "Murals" nav link |

**Selling-point cards (`#features`):**

| # | Card `<h3>` | Card copy |
|---|-------------|-----------|
| 1 | Full Turnkey Solution | In-house design, on-site measuring, quick turnaround, competitive bulk pricing, and on-site licensed and insured installation. One team handles your mural from concept to finished wall. |
| 2 | Commercial Grade & Safe | Our mural material is fire-rated and safe for commercial use, so your investment meets the safety and compliance standards your property requires. |
| 3 | Customizable Options | Produced in any design or shape, with various finishes available — including UV and reactive prints — so every mural matches your brand exactly. |

**Special Notes:**
- This page does **not** load the `model-viewer` ES module (same as `about.html` / `contact.html`)
- Loads `theme.js` in `<head>` and `hours.js` at the bottom of `<body>`, like every other page
- All six gallery tiles use real photos — tiles 1–2: `Images/Mural_1.JPG` / `Images/Mural_2.JPG`; tiles 3–6: `Images/Mural_3.webp` through `Images/Mural_6.webp`. No placeholder tiles remain in the gallery. `Images/Mural_7.webp` and `Images/Mural_8.webp` exist in `Images/` as spares for future additions
- To swap in more real photos (e.g., the spare `Mural_7.webp` / `Mural_8.webp`), keep the tile `<div>` and place an `<img src="Images/…" alt="meaningful description" loading="lazy">` inside it. The `.mural-tile img` rule in `style.css` constrains any such image (`display: block; width: 100%; height: 100%; object-fit: cover;`) and `.mural-tile` uses `overflow: hidden` + `padding: 0` when it contains an `img` (via `:has(img)`) — no inline styles needed. No other structural change is required

---

### 2.6 [`apartments-hotels.html`](apartments-hotels.html) — Apartments & Hotels Page

**Title:** `Apartment & Hotel Construction and Renovation | Tryjax Construction`

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Header | `<header>` | Same shared header (7 nav links) |
| 2 | Hero | `#home.hero` | H1 "Apartment & Hotel Construction and Renovation", subtitle, and two CTAs: `.btn` "Get a Quote" (→ `contact`) and `.btn.btn-ghost` "See the Ready to Rent Program" (→ `ready-to-rent`) |
| 3 | What We Build | `#services.section` | `.section-title` + `.services-grid` with four `.service-card` items: **Multifamily New Construction**, **Apartment Renovation**, **Hotel New Construction**, **Hotel Renovation & PIPs** |
| 4 | Ready to Rent Program | `#rtr.section.rtr-band` | Dark feature band: `.eyebrow` "Featured Program", H2 "Ready to Rent Program", intro line, 3-card pricing grid (Standard Turn `from $1,750`, Heavy Turn `$5,950–$8,350`, Value-Add Renovation `$11,400–$16,200`), `.checks` grid (Flat pricing / One point of contact / Photos on every unit / 5-business-day standard turns), `.offer` pilot box with "Start a Pilot" mailto `.btn`, and a "Full Program Details" `.btn` (→ `ready-to-rent`) |
| 5 | How It Works | `#process.section` | `.section-title` + `.services-grid` with four `.service-card` items: **1. Walk**, **2. Scope**, **3. Build**, **4. Hand Off** |
| 6 | Team | `#team.section.bg-light` | Centered `.section-title` "Talk to Our Team" + `.services-grid` with three `.service-card` items (Chad Reeves — Owner, President & CEO; Trystan Reeves — Business Development; Andrew Goodwin — Sales & Estimating), each card with a `tel:` link + `mailto:` link; "Get a Quote" `.btn` (→ `contact`) |
| 7 | Footer | `<footer>` | Same shared multi-column footer (7 nav links) |

**Special Notes:**
- JSON-LD `@graph`: `Service` (`#service`), `WebPage` (`#webpage`), `BreadcrumbList` (Home → Apartments & Hotels)
- og:image / twitter:image is `Images/ApartmentBuildingTryjax.webp` (alt "Multifamily apartment building built by Tryjax Construction") — the only page that does not use the default `hero-bg.jpg` og image
- Loads `theme.js` in `<head>` and `hours.js` before `</body>`; does not load `model-viewer`

---

### 2.7 [`ready-to-rent.html`](ready-to-rent.html) — Ready to Rent Page

**Title:** `Ready to Rent Program | Apartment Unit Turns | Tryjax Construction`

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Header | `<header>` | Same shared header (7 nav links) |
| 2 | Hero | `#home.hero` | H1 "Ready to Rent Program", subtitle, and two CTAs: `.btn` "Start a Pilot" (mailto with prefilled subject) and `.btn.btn-ghost` "Call (941) 887-6997" (`tel:+19418876997`) |
| 3 | Flat Pricing | `#pricing.section` | `.section-title` "Flat Pricing" + `.ptable` (columns: Package / 1 BR / 2 BR / 3 BR; rows: Standard Turn from $1,750 / $2,200 / $2,800, Heavy Turn `$5,950–$8,350` spanning all three BR columns, Value-Add Renovation `$11,400–$16,200` spanning all three BR columns) + note paragraph |
| 4 | Why Property Teams Use It | `#why.section.rtr-band` | Dark feature band: H2 + `.services-grid` with four `.service-card` items (Flat Pricing, One Point of Contact, Photos on Every Unit, 5-Business-Day Turns) + the same `.offer` pilot box as `apartments-hotels.html` |
| 5 | FAQ | `#faq.section` | `.section-title` + `.faq` with four `<details>/<summary>` accordions (5-business-day clock start, pilot details, Heavy Turn / Value-Add escalation, how to get started — last item links to `contact`) |
| 6 | Team | `#team.section.bg-light` | Identical to `apartments-hotels.html` "Talk to Our Team" section (same 3 cards, same "Get a Quote" `.btn`) |
| 7 | Footer | `<footer>` | Same shared multi-column footer (7 nav links) |

**Special Notes:**
- JSON-LD `@graph`: `Service` (`#service`), `WebPage` (`#webpage`), `BreadcrumbList` (Home → Ready to Rent)
- og:image / twitter:image is the default `Images/hero-bg.jpg`
- Loads `theme.js` in `<head>` and `hours.js` before `</body>`; does not load `model-viewer`

---

### 2.8 [`careers.html`](careers.html) — Careers Page

**Title:** `Careers at TryJax Construction | Construction Jobs`

**Purpose:** Static recruiting/marketing page. Job listings and applications are hosted and managed by a third-party platform (e.g., Indeed). The page never collects, stores, or uploads application data.

**Sections (top to bottom):**

| # | Section | ID/Class | Description |
|---|---------|----------|-------------|
| 1 | Skip Link | `.skip-link` | Keyboard "Skip to main content" link, visually hidden until focused |
| 2 | Header | `<header>` | Shared header including the "Careers" nav link and a prominent external "View Open Positions" `.header-jobs-btn` placed just before the theme toggle |
| 3 | Hero | `#home.hero` | `.hero-eyebrow` "Careers at TryJax", H1 "Build great projects with great people.", intro copy, primary `.btn` "View Current Openings" (external) + `.btn.btn-ghost` "Learn About TryJax" (→ `#why-tryjax`), `.hero-note` external-hosting disclosure |
| 4 | Why Work with TryJax? | `#why-tryjax.section` | Four `.service-card` items in a `.services-grid`: Nationwide Project Experience (41 states), Varied Construction Work, Quality and Professionalism, Opportunities for Experienced Professionals |
| 5 | Current Hiring Focus | `#hiring-focus.section.bg-light` | `.section-intro` line + `.checks` grid of six common hiring areas + `.notice` box (a role is open only when listed on the job-listing page) + `.notice.pay-notice` carpenter pay range ($40–$65/hr, explicitly scoped to carpenter openings only) + `.btn` "See Active Job Listings" (external) |
| 6 | Local and Traveling Opportunities | `#opportunities.section` | Two `.service-card` items: Local Opportunities (Tampa, Bradenton, Parrish, Sarasota, Florida Gulf Coast) and Traveling Opportunities (nationwide; travel terms explained per listing) |
| 7 | What We Value | `#values.section.bg-light` | Six `.checks` items (attendance, safety, craftsmanship, communication, conduct, detail) + supporting paragraph |
| 8 | How to Apply | `#how-to-apply.section` | Four-step `.steps` ordered list + `.notice` third-party platform disclosure |
| 9 | Work Samples and Qualifications | `#work-samples.section.bg-light` | Work-sample/reference guidance + `.notice` safety warning (do not send SSN, banking info, or identity documents by ordinary email) |
| 10 | Trade Partner | `#trade-partner.section` | Separate subcontractor route, distinct from employee applications. `.btn.btn-ghost` "Submit a Trade Partner Inquiry" — currently a `mailto:info@tryjax.com?subject=Trade%20Partner%20Inquiry` placeholder; replace with a dedicated external form when one exists |
| 11 | Final CTA | `#cta.section.rtr-band` | H2 "Ready to See Where You Fit?", copy, primary `.btn` "View Current Openings" (external) + `.btn.btn-ghost` "Explore TryJax Projects" (→ `apartments-hotels`) |
| 12 | Footer | `<footer>` | Shared multi-column footer with the "Careers" nav link; copyright reads "TryJax Construction LLC" |

**Special Notes:**
- JSON-LD `@graph`: `AboutPage` (`#webpage`) + `BreadcrumbList` (Home → Careers). No `JobPosting` structured data — job details live on the external platform, which owns the job-specific markup
- **External job-listing URL:** every "View Current Openings" / job-platform link (header button, hero, hiring focus, final CTA) currently points to `https://www.indeed.com/` as a placeholder. When the official Indeed employer-page URL is approved, update all four links to the same destination (spec: one central external URL, same destination site-wide)
- `data-track` attributes on external links feed an inline analytics stub that console-logs `career_jobs_link_click` (`hero-view-openings`, `hiring-focus-jobs-link`, `bottom-view-openings`) and `career_trade_partner_click`. Swap the stub for a real analytics provider's event calls when one is configured; recommended properties: link destination, button location, page URL, referral source, campaign params
- No featured individual job listings are duplicated on the page (spec 5.2: only if maintained weekly)
- Talent-network section intentionally omitted (optional section 4.10; no external form exists yet)
- Loads `theme.js` in `<head>` and `hours.js` before `</body>`; does not load `model-viewer`

---

## 3. Shared Components

### 3.1 Header (All Pages)

```html
<header>
    <div class="container">
        <a href="index" class="logo"><img src="Images/LogoText.png" alt="TRYJAX"></a>
        <nav>
            <ul>
                <li><a href="index">Home</a></li>
                <li><a href="about">About</a></li>
                <li><a href="apartments-hotels">Apartments &amp; Hotels</a></li>
                <li><a href="ready-to-rent">Ready to Rent</a></li>
                <li><a href="scans">3D Imaging</a></li>
                <li><a href="mural">Murals</a></li>
                <li><a href="careers">Careers</a></li>
                <li><a href="contact">Contact</a></li>
                <li>
                    <button class="theme-toggle" aria-label="Toggle dark mode">
                        <img class="icon" src="Images/MoonIcon.png" alt="">
                        <span class="label">Dark</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</header>
```

- Flexbox layout with logo left, nav right on desktop (>768px); on mobile (≤768px) the header wraps so the nav drops to its own full-width row below the logo (see "Mobile header wrapping" below)
- Logo is an `<img>` inside an `<a>` link
- Nav items are flex-aligned with full-height hover backgrounds on desktop (order: Home, About, Apartments & Hotels, Ready to Rent, 3D Imaging, Murals, Careers, Contact)
- The careers page (`careers.html`) additionally inserts a "View Open Positions" external button (`.header-jobs-btn`, styled as an orange pill) as the nav item just before the theme toggle. This is the only page-specific header addition; all other pages share the exact header above
- Theme toggle button is the last nav item
- The toggle icon is an `<img class="icon">` (`Images/MoonIcon.png` in light mode, `Images/SunIcon.png` in dark mode), swapped by `theme.js`

#### Mobile header wrapping (≤768px)

On mobile (320–768px) the logo sits on row 1 and all 5 nav links + the theme toggle sit on row 2, centered; below ~490px the row 2 links wrap to two centered lines. Nothing is clipped. Desktop (>768px) is unchanged, and theming is unaffected — the fix uses only flex/width/padding properties, no colors.

The rules live in a dedicated `@media (max-width: 768px)` block in [`style.css`](style.css:883) (lines ~883–912, immediately after the mobile theme-toggle block at [`style.css`](style.css:872)):

| Selector | Mobile properties |
|----------|-------------------|
| `header .container` | `flex-wrap: wrap`, `height: auto`, `padding: 12px 0`, `row-gap: 8px` — lets the nav drop to its own full-width row below the logo |
| `header nav` | `width: 100%`, `height: auto` |
| `header nav ul` | `flex-wrap: wrap`, `justify-content: center` |
| `header nav ul li` | `height: auto` |
| `header nav ul li a` | `margin: 4px 0`, `padding: 10px 14px` (comfortable tap targets) |

**Root cause of the bug this fixes:** the non-wrapping flex nav (intrinsic width ~581px) plus the logo (~202px) overflowed the 80%-width `.container` (which has `overflow: hidden`) on narrow viewports (widths below ~979px), clipping the last nav link and the theme toggle at the right edge. The wrapping rules let the header break into two rows, so the nav no longer overflows the container.

### 3.2 Footer (All Pages)

```html
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-column">
                <h3>Navigation</h3>
                <ul>
                    <li><a href="index">Home</a></li>
                    <li><a href="about">About</a></li>
                    <li><a href="apartments-hotels">Apartments &amp; Hotels</a></li>
                    <li><a href="ready-to-rent">Ready to Rent</a></li>
                    <li><a href="scans">3D Imaging</a></li>
                    <li><a href="mural">Murals</a></li>
                    <li><a href="careers">Careers</a></li>
                    <li><a href="contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Contact</h3>
                <p><a href="mailto:info@tryjax.com">info@tryjax.com</a></p>
                <p>We respond within 24 hours</p>
            </div>
            <div class="footer-column">
                <h3>Business Hours</h3>
                <p id="footer-business-hours"></p>
                <p id="footer-business-hours-note" class="hours-note"></p>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <p>&copy; 2026 Tryjax Construction. All rights reserved.</p>
        </div>
    </div>
</footer>
<script src="hours.js"></script>
```

- 3-column grid layout (`.footer-grid`) with Navigation, Contact, and Business Hours columns
- Each column has an `<h3>` title styled with accent color and bottom border
- Navigation links have hover effects (color change + subtle left shift)
- Business Hours column populated dynamically by `hours.js` targeting `#footer-business-hours`
- Bottom bar (`.footer-bottom`) contains copyright text, separated by top border
- `margin-top: auto` on footer pushes it to the bottom via flexbox column on `<body>`
- Responsive: Columns stack vertically at `768px` breakpoint with centered text

### 3.3 Hero Section (All Pages)

All pages use the same hero structure with `id="home"` and class `hero`. The background image (`hero-bg.jpg`) and dark overlay (`::before` pseudo-element) are identical across pages. Only the inner text (H1 and paragraph) changes per page.

#### Hero Text Halo

The `#home::before` pseudo-element renders a localized radial-gradient "halo" that darkens the background only around the hero text, keeping the hero text readable without darkening the entire `hero-bg.jpg`. The outer area of the image stays bright.

```css
#home::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(
        ellipse 75% 60% at center,
        var(--hero-halo) 0%,
        rgba(0, 0, 0, 0.4) 40%,
        transparent 75%
    );
    z-index: 1;
    pointer-events: none;
}
```

- **Stacking:** The halo sits at `z-index: 1`; `#home .container` is `position: relative; z-index: 2`, so the H1/subtitle render above it. `pointer-events: none` on the pseudo-element keeps the CTA `.btn` clickable.
- **Theme variable:** The center gradient stop uses `--hero-halo`, which `theme.js` switches via the `data-theme` attribute on `<html>` (see Section 5.1):

| Theme | Selector | Value |
|-------|----------|-------|
| Light | `:root` | `rgba(0, 0, 0, 0.72)` |
| Dark | `[data-theme="dark"]` | `rgba(0, 0, 0, 0.78)` |

- **Mobile:** In the `@media (max-width: 768px)` block, the ellipse widens to `ellipse 120% 120% at center` with the same gradient stops so the taller wrapping text block stays covered.
- **Tuning knobs:** `--hero-halo` (center intensity per theme), the ellipse dimensions (`75% 60%` desktop, `120% 120%` mobile), and the gradient stops (`0%` center, `40%` mid, `75%` transparent).
- **Scope:** Applies site-wide to every page sharing `#home` (`index.html`, `about.html`, `apartments-hotels.html`, `ready-to-rent.html`, `scans.html`, `mural.html`, `contact.html`, `careers.html`). The former flat-overlay variable `--hero-overlay` is no longer used by any rule; it is intentionally left in place for this documentation and the dark-mode plan.

**Tuning note:** The first gradient pass (center `0.55`/`0.6` → `0.3` → transparent) was structurally correct but perceptually too faint over the bright image; the center stops were raised to `0.72`/`0.78` and the mid stop to `0.4`.

---

## 4. CSS Architecture

### 4.1 File: [`style.css`](style.css)

Single stylesheet for the entire site. No CSS preprocessor or module bundling.

**Organization (top to bottom):**
1. CSS Custom Properties (`:root` and `[data-theme="dark"]`)
2. Body reset and `.container`
3. Header styles
4. Hero section styles
5. Section base styles
6. Services grid + cards
7. Team grid + cards
8. Clients grid + cards
9. Partners logos section (with `@keyframes partnersScroll`)
10. 3D Model Viewer styles
10. Contact Form styles
11. Footer styles
12. Theme Toggle button styles
13. Alternating Image-Text content rows
14. Responsive media queries (interspersed near relevant sections)
15. Mural gallery (`.mural-gallery`, `.mural-tile`, `.mural-tile-1` … `.mural-tile-6` — appended at the end of the file)
16. Apartments & Hotels / Ready to Rent components (`.rtr-band`, `.eyebrow`, `.price`, `.checks`, `.offer`, `.ptable`, `.faq details` / `.faq summary`, `.btn-ghost`, `.hero .btn` — appended at the end of the file)
17. Careers page components (`.skip-link`, `a:focus`/`button:focus` indicators, `.header-jobs-btn`, `.hero-eyebrow`, `.hero-note`, `.section-intro`, `.notice` / `.pay-notice`, `.steps` — appended at the end of the file)

### 4.2 CSS Custom Properties (Theming System)

All colors are managed through CSS custom properties defined on `:root` (light theme) and `[data-theme="dark"]` (dark theme). The JavaScript `theme.js` toggles the `data-theme` attribute on the `<html>` element.

#### Light Theme Variables (`:root`)

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#ffffff` | Main page background |
| `--bg-secondary` | `#f4f4f4` | Alternating section backgrounds (`.bg-light`) |
| `--bg-header` | `#2c3e50` | Header background |
| `--bg-footer` | `#2c3e50` | Footer background |
| `--bg-card` | `#ffffff` | Card backgrounds (service, team, client) |
| `--bg-form` | `#ffffff` | Form container background |
| `--bg-model-viewer` | `#f9f9f9` | 3D model viewer background |
| `--text-primary` | `#333333` | Main body text |
| `--text-secondary` | `#666666` | Descriptions, secondary text |
| `--text-tertiary` | `#999999` | Placeholder text |
| `--text-header` | `#ffffff` | Header nav text |
| `--text-footer` | `#ffffff` | Footer text |
| `--text-on-accent` | `#ffffff` | Text on accent-colored backgrounds |
| `--accent-primary` | `#e67e22` | Buttons, highlights, card titles |
| `--accent-hover` | `#d35400` | Button/card hover states |
| `--accent-border` | `#e67e22` | Borders on accent elements |
| `--border-primary` | `#dddddd` | Card/input borders |
| `--border-focus` | `#e67e22` | Input focus ring |
| `--shadow-card` | `0 2px 5px rgba(0,0,0,0.1)` | Default card shadow |
| `--shadow-card-hover` | `0 5px 15px rgba(0,0,0,0.1)` | Hover card shadow |
| `--shadow-form` | `0 4px 15px rgba(0,0,0,0.1)` | Form container shadow |
| `--shadow-model` | `0 4px 10px rgba(0,0,0,0.1)` | Model viewer shadow |
| `--hero-overlay` | `rgba(0,0,0,0.5)` | Hero section dark overlay |

#### Dark Theme Overrides (`[data-theme="dark"]`)

| Variable | Value | Notes |
|----------|-------|-------|
| `--bg-primary` | `#1a1a2e` | Dark navy primary background |
| `--bg-secondary` | `#16213e` | Slightly lighter navy for alternating sections |
| `--bg-header` | `#0f3460` | Deep blue header |
| `--bg-footer` | `#0f3460` | Deep blue footer |
| `--bg-card` | `#1f2937` | Dark gray card background |
| `--bg-form` | `#1f2937` | Dark gray form background |
| `--bg-model-viewer` | `#1f2937` | Dark gray model viewer background |
| `--text-primary` | `#e5e7eb` | Light gray main text |
| `--text-secondary` | `#9ca3af` | Medium gray secondary text |
| `--text-tertiary` | `#6b7280` | Dark gray placeholder text |
| `--accent-hover` | `#f39c12` | Brighter orange hover for dark mode |
| `--border-primary` | `#374151` | Dark border color |
| `--hero-overlay` | `rgba(0,0,0,0.3)` | Lighter overlay for dark mode |
| Shadow variables | Higher opacity (`0.3`-`0.4`) | More visible shadows on dark backgrounds |

**Accent color (`--accent-primary: #e67e22`) remains the same in both themes.**

### 4.3 Layout Classes

| Class | Purpose | Key Properties |
|-------|---------|---------------|
| `.container` | Centered content wrapper | `width: 80%`, `margin: auto`, `overflow: hidden` |
| `.section` | Generic section spacing | `padding: 40px 0`, `text-align: center` |
| `.bg-light` | Alternating section background | `background-color: var(--bg-secondary)` |
| `.hero` | Hero section layout | Flexbox column, centered, `height: 400px` |
| `.content-row` | Side-by-side image+text | Flexbox row, `gap: 40px`, `margin-bottom: 60px` |
| `.content-row.reverse` | Reverse image/text order | `flex-direction: row-reverse` |
| `.content-image` | Image column in content rows | `flex: 1`, `min-width: 0` |
| `.content-image-placeholder` | Gradient placeholder tile in the Custom Murals row (matches `.mural-tile`) | `width: 100%`, `height: 350px` (250px at 768px), `border-radius: 8px`, `box-shadow: var(--shadow-card)`, centered italic label, semi-transparent orange → purple gradient |
| `.content-image.full-size` | No-crop modifier for `.content-image` | `height: auto`, `max-height: 80vh`, `object-fit: contain` (off by default) |
| `.content-text` | Text column in content rows | `flex: 1`, `min-width: 0` |
| `.services-grid` | 3-column auto-fit grid | `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` |
| `.team-grid` | 3-column auto-fit grid | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` |
| `.clients-grid` | Multi-column auto-fit grid | `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))` |
| `.map-figure` | Coverage area map wrapper | `max-width: 800px`, centered, `border-radius: 8px`, `box-shadow: var(--shadow-card)` with hover transition |
| `.partners-section` | Partners logos section | `background-color: var(--bg-secondary)`, `overflow: hidden` |
| `.partners-track-wrapper` | Full-width overflow container | `mask-image` for edge fade, hides logos entering/exiting |
| `.partners-track` | Animated flex row | `display: flex`, `gap: 40px`, `width: max-content`, infinite scroll via `@keyframes partnersScroll` |
| `.partner-logo` | Individual logo card | Fixed-size card with grayscale filter, hover scale + color restore |
| `.form-container` | Centered form wrapper | `max-width: 800px`, centered, card-style with shadow |
| `.form-row` | Two-column form layout | `grid-template-columns: 1fr 1fr`, `gap: 20px` |
| `.form-group` | Single form field | Flexbox column, `margin-bottom: 20px` |
| `.footer-grid` | 3-column footer layout | `grid-template-columns: repeat(3, 1fr)`, stacks to 1 column at `768px` |
| `.footer-column` | Individual footer column | Contains `<h3>` title + content (nav list, contact info, or hours) |
| `.footer-bottom` | Footer copyright bar | Top border separator, centered text |
| `.mural-gallery` | Mural gallery grid | `display: grid`, `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, `gap: 20px` — auto-reflows at the `768px` breakpoint, no dedicated media query |
| `.mural-tile` | Mural gallery tile | Fixed `height: 220px`, `border-radius: 8px`, `box-shadow: var(--shadow-card)`, `overflow: hidden`, centered flex label, hover lift (`translateY(-5px)` + `var(--shadow-card-hover)`) |
| `.mural-tile img` | Photo inside a mural tile | `display: block; width: 100%; height: 100%; object-fit: cover;` — fills the 220px tile without overflowing (applies to any `<img>` in a tile). `.mural-tile:has(img)` drops the tile's 10px padding so photos span edge-to-edge |

### 4.4 Component Classes

| Class | Used On | Description |
|-------|---------|-------------|
| `.service-card` | `<div>` | Card with border, shadow, centered text. Used for services and contact info |
| `.team-card` | `<div>` | Card with circular avatar image, name, role, bio |
| `.client-card` | `<div>` | Square card with centered logo image. Hover lifts card and increases image opacity |
| `.btn` | `<a>`, `<button>` | Orange accent button with hover state. Used for CTAs and form submit |
| `.submit-btn` | `<button>` | Full-width variant of `.btn` with larger font |
| `.theme-toggle` | `<button>` | Pill-shaped toggle with icon + label. Transparent background, orange border |
| `.map-figure` | `<figure>` | Semantic wrapper for the US coverage map image. Centered with rounded corners, card shadow, and hover effect |
| `.partner-showcase` | `<div>` | Centered layout for partner company logo and description text |
| `.iris-logo` | `<img>` | Base class for IRIS logo images |
| `.iris-logo-light` | `<img>` | IRIS logo visible in light mode (`display: block`), hidden in dark mode |
| `.iris-logo-dark` | `<img>` | IRIS logo visible in dark mode (`display: block`), hidden in light mode |
| `.section-title` | `<h2>` | Extra bottom margin (`60px`) for section headings |
| `.rtr-band` | `<section>` | Dark feature band using the header background (`var(--bg-header)`) with header-colored text; inner `.service-card` elements are re-themed to page background. Used on `apartments-hotels.html` (`#rtr`) and `ready-to-rent.html` (`#why`) |
| `.eyebrow` | `<p>` | Uppercase, letter-spaced, accent-colored label above a section heading (e.g., "Featured Program") |
| `.price` | `<div>` | Large bold price line inside `.service-card` on the Apartments & Hotels / Ready to Rent pages |
| `.checks` | `<div>` | Auto-fit grid of check-mark items summarizing program guarantees |
| `.offer` | `<div>` | Dashed-border centered box for the Ready to Rent pilot offer (paragraph + `.btn`) |
| `.ptable` | `<table>` | Flat pricing table on `ready-to-rent.html`: accent header row, card-background cells; compact padding/font at ≤600px |
| `.faq details` | `<details>` | FAQ accordion item: card background, border, rounded corners, centered `max-width: 760px` |
| `.faq summary` | `<summary>` | Bold, clickable FAQ question |
| `.btn-ghost` | `<a>` | Transparent ghost button with a light outline for the dark hero image; fills with accent on hover |
| `.hero .btn` | `.hero .btn` | Horizontal margin between side-by-side hero CTA buttons |
| `.skip-link` | `<a>` | Keyboard skip-to-content link; visually hidden until focused (careers page) |
| `.header-jobs-btn` | `<a>` | Prominent external "View Open Positions" button inside the shared header nav (careers page) |
| `.hero-eyebrow` | `<p>` | Hero eyebrow label variant with extra spacing above the H1 (careers page) |
| `.hero-note` | `<p>` | Small external-hosting disclosure note below the hero CTAs (careers page) |
| `.section-intro` | `<p>` | Centered, max-width intro paragraph used across careers sections |
| `.notice` | `<div>` | Left-accent-bordered disclosure box (`.pay-notice` variant uses a muted border); used for role-availability, third-party platform, and safety notices |
| `.steps` | `<ol>` | Numbered application-steps list: card items with accent `<h3>` headings (careers page) |

### 4.5 Responsive Design

Single breakpoint at **768px** (`max-width`):

| Element | Mobile Change |
|---------|--------------|
| `header .container` | Wraps to two rows: `flex-wrap: wrap`, `height: auto`, `padding: 12px 0`, `row-gap: 8px` — logo on row 1, nav drops to its own full-width row 2 (see Section 3.1) |
| `header nav` | `width: 100%`, `height: auto` |
| `header nav ul` | `flex-wrap: wrap`, `justify-content: center` (row 2 links wrap to two centered lines below ~490px) |
| `header nav ul li` | `height: auto` (hover background covers the link padding, not the full row) |
| `header nav ul li a` | `margin: 4px 0`, `padding: 10px 14px` (comfortable tap targets) |
| `model-viewer` | Height reduced from `500px` to `400px` |
| `.form-row` | Single column (`grid-template-columns: 1fr`) |
| `.form-container` | Reduced padding from `40px` to `25px` |
| `.hero` | Height reduced from `400px` to `300px` |
| `.theme-toggle` | Reduced padding and font size; label text hidden (icon only) |
| `.content-row` / `.content-row.reverse` | Stacked vertically (`flex-direction: column`) |
| `.content-image img` | Height reduced from `350px` to `250px` |
| `.content-image-placeholder` | Height reduced from `350px` to `250px` (keeps the placeholder box in step with the sibling image rows) |
| `.content-image.full-size img` | Height reset to `auto` (preserves no-crop behavior, ignores 250px override) |
| `.content-text h2` | Center-aligned, font size reduced from `28px` to `24px` |
| `.content-text p` | Center-aligned |
| `.partners-track` | Reduced gap from `40px` to `20px`, faster animation (`20s`) |
| `.partner-logo` | Reduced size from `180px×100px` to `140px×80px`, reduced padding |
| `.partner-logo img` | Max-height reduced from `60px` to `45px` |
| `.mural-tile` | No change — the `.mural-gallery` auto-fit grid reflows at the `768px` breakpoint |

---

## 5. JavaScript

### 5.1 File: [`theme.js`](theme.js)

**Pattern:** Immediately Invoked Function Expression (IIFE) — `ThemeManager` module.

**Purpose:** Manages dark/light theme switching with persistence and system preference detection.

#### Public API

| Method | Description |
|--------|-------------|
| `ThemeManager.init()` | Initialize theme manager. Called on DOM ready. |

#### Internal Functions

| Function | Description |
|----------|-------------|
| `getInitialTheme()` | Determines starting theme: `localStorage` > system `prefers-color-scheme` > `light` default |
| `applyTheme(theme)` | Sets `data-theme` attribute on `<html>`, saves to `localStorage`, updates toggle button |
| `toggleTheme()` | Switches between `light` and `dark` |
| `listenForSystemChanges()` | Listens for `prefers-color-scheme` changes. Only applies if user has not made an explicit choice |
| `updateToggleButtonText(theme)` | Updates the icon image (`.icon` `<img>`: `Images/MoonIcon.png` in light mode, `Images/SunIcon.png` in dark mode) and label (`Dark`/`Light`) on the `.theme-toggle` button |

#### Storage Key

| Key | Value |
|-----|-------|
| `tryjax-theme` | `"light"` or `"dark"` |

#### Initialization

Script checks `document.readyState`. If DOM is still loading, attaches to `DOMContentLoaded`. Otherwise, initializes immediately. This ensures no flash of wrong theme.

---

### 5.2 File: [`hours.js`](hours.js)

**Pattern:** Immediately Invoked Function Expression (IIFE) — self-contained module.

**Purpose:** Converts business hours from a base timezone to the visitor's local timezone and displays the result with a timezone label on all pages (contact info card and footer). When the visitor's local timezone differs from the base timezone, a small note below the hours explains that the times have been adjusted to the visitor's local time zone.

#### Configuration

| Constant | Default | Description |
|----------|---------|-------------|
| `BASE_TIMEZONE` | `'America/Denver'` | IANA timezone where business hours are defined |
| `HOURS.open` | `{ hour: 9, minute: 0 }` | Opening time in 24-hour format |
| `HOURS.close` | `{ hour: 17, minute: 0 }` | Closing time in 24-hour format |

#### Internal Functions

| Function | Description |
|----------|-------------|
| `formatTime(hour, minute)` | Converts 24-hour time to 12-hour format with am/pm suffix |
| `convertHours(baseTz, targetTz, openTime, closeTime)` | Calculates timezone offset using `toLocaleString()` comparison, applies it to open/close times; returns `{ open, close, adjusted }` where `adjusted` is `true` when the offset from the base timezone is non-zero |
| `updateHours()` | Detects user timezone, converts hours, updates all four DOM targets below (hours text + adjustment note) |

#### Timezone Adjustment Note

- After conversion, `updateHours()` compares the visitor's offset against the base timezone:
  - **Offset differs (adjustment happened):** the note elements are filled with `These hours have been adjusted to your local time zone ({timezone name}).`
  - **Offset is zero (visitor already in `America/Denver`):** the note elements are left empty and hidden via the `.hours-note:empty { display: none; }` CSS rule — nothing is displayed.
- The note appears directly below the hours text in the contact page Business Hours card and in the footer Business Hours column of every page.
- Styling: the `.hours-note` class (see `style.css`) renders small italic text using `var(--text-secondary)` (footer: `var(--text-footer)` at reduced opacity), so it follows the active light/dark theme.

#### DOM Targets

| Selector | Element | Location | Updated Content |
|----------|---------|----------|----------------|
| `#business-hours` | `<p>` in Business Hours card | Contact page only | `Mon - Fri: {open} - {close} ({timezone name})` |
| `#business-hours-note` | `<p class="hours-note">` in Business Hours card | Contact page only | Adjustment note (see above); empty + hidden when no adjustment |
| `#footer-business-hours` | `<p>` in footer Business Hours column | All pages | `Mon - Fri: {open} - {close} ({timezone name})` |
| `#footer-business-hours-note` | `<p class="hours-note">` in footer Business Hours column | All pages | Adjustment note (see above); empty + hidden when no adjustment |

#### Initialization

Same pattern as `theme.js` — checks `document.readyState` and either attaches to `DOMContentLoaded` or runs immediately. Loaded at the bottom of `<body>` on all pages (before `</body>`).

---

## 6. 3D Model Viewer

### 6.1 Integration

The `<model-viewer>` element from Google's Model Viewer library is used on the home page (`index.html`) and 3D scans page (`scans.html`).

**Script Load:**
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.3.0/model-viewer.min.js"></script>
```

### 6.2 Configuration

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `src` | `Models/Cube.glb` | 3D model file path |
| `environment-image` | `HDR/tree_lined_driveway_1k.hdr` | HDR environment for realistic lighting |
| `camera-controls` | (present) | Enables user orbit/zoom interaction |
| `auto-rotate` | (present) | Model slowly rotates when idle |
| `camera-orbit` | `70deg 60deg 120%` | Default camera position |
| `field-of-view` | `45deg` | Camera field of view |
| `min-camera-orbit` | `auto auto 50%` | Minimum zoom limit |
| `max-camera-orbit` | `auto auto 200%` | Maximum zoom limit |
| `shadow-intensity` | `1` | Full shadow intensity |
| `shadow-softness` | `0.5` | Medium shadow softness |
| `touch-action` | `pan-y` | Allows vertical page scrolling without interfering with model interaction |
| `exposure` | `0.8` | Slightly reduced exposure |

---

## 7. Assets Reference

### 7.1 Images (`Images/`)

| File | Type | Used In |
|------|------|---------|
| `Favicon.png` | PNG | Site favicon (`<link rel="icon">`) |
| `hero-bg.jpg` | JPG | Hero section background on all 7 pages (`background-image`); default og:image / twitter:image on all pages except `apartments-hotels.html` |
| `ApartmentBuildingTryjax.webp` | WebP | og:image / twitter:image on `apartments-hotels.html`; "National Development" and "Apartments" content-row images on `index.html` |
| `Logo.jpeg` | JPEG | Placeholder for team member avatars and client logos |
| `LogoText.png` | PNG | Header logo image |
| `Mural_1.JPG` | JPG | Mural gallery tile 1 (`.mural-tile-1`) on `mural.html` |
| `Mural_2.JPG` | JPG | Mural gallery tile 2 (`.mural-tile-2`) on `mural.html` |
| `Mural_3.webp` | WebP | Mural gallery tile 3 (`.mural-tile-3`) on `mural.html` |
| `Mural_4.webp` | WebP | Mural gallery tile 4 (`.mural-tile-4`) on `mural.html` |
| `Mural_5.webp` | WebP | Mural gallery tile 5 (`.mural-tile-5`) on `mural.html` |
| `Mural_6.webp` | WebP | Mural gallery tile 6 (`.mural-tile-6`) on `mural.html` |
| `Mural_7.webp` | WebP | Spare — not currently used (reserved for future gallery additions) |
| `Mural_8.webp` | WebP | Spare — not currently used (reserved for future gallery additions) |

### 7.2 3D Models (`Models/`)

| File | Format | Used In |
|------|--------|---------|
| `Cube.glb` | GLB (glTF Binary) | `<model-viewer>` on home page and scans page |

### 7.3 HDR Environment Maps (`HDR/`)

| File | Format | Used In |
|------|--------|---------|
| `tree_lined_driveway_1k.hdr` | HDR | Environment lighting for `<model-viewer>` |

---

## 8. Browser Meta Tags

Each page includes the following meta tags for mobile/PWA compatibility:

```html
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)">
```

These set the browser chrome color (address bar on mobile) to match the active theme.

---

## 9. Development Guidelines

### 9.1 Adding a New Page

1. Copy any existing `.html` file as a template
2. Update `<title>`, hero content, and main sections
3. Ensure `<script src="theme.js"></script>` is in `<head>`
4. Ensure header nav and footer are identical to other pages
5. Add nav link to all existing pages

### 9.2 Adding New CSS

- Add new CSS custom properties to both `:root` and `[data-theme="dark"]` blocks if introducing new colors
- Place new component styles logically within the existing organization of `style.css`
- Use existing layout classes (`.container`, `.section`, `.bg-light`) for consistency
- Test at both desktop and `768px` breakpoint

### 9.3 Modifying the Theme

- Edit the variable values in `style.css` `:root` and `[data-theme="dark"]` blocks
- Do NOT use hardcoded color values in rules — always reference `var(--*)` properties
- Accent color is the brand orange (`#e67e22`). Changing it should be deliberate and coordinated

### 9.4 Adding Form Functionality

- The contact form on `contact.html` is currently static
- To add submission: set `action` attribute on `<form>` and add `method="POST"`
- Consider adding client-side validation with JavaScript
- No backend currently exists

### 9.5 Adding Content to Alternating Rows

Use the `.content-row` pattern from [`index.html`](index.html:72):
```html
<!-- Image on Left -->
<div class="content-row">
    <div class="content-image">
        <img src="Images/..." alt="...">
    </div>
    <div class="content-text">
        <h2>Title</h2>
        <p>Description...</p>
    </div>
</div>

<!-- Image on Right -->
<div class="content-row reverse">
    <div class="content-image">
        <img src="Images/..." alt="...">
    </div>
    <div class="content-text">
        <h2>Title</h2>
        <p>Description...</p>
    </div>
</div>

<!-- Full-size image (no cropping, natural dimensions, max 80vh) -->
<div class="content-row">
    <div class="content-image full-size">
        <img src="Images/..." alt="...">
    </div>
    <div class="content-text">
        <h2>Title</h2>
        <p>Description...</p>
    </div>
</div>
```

**Default behavior (no `.full-size` class):** Image is cropped to a fixed `350px` height using `object-fit: cover`. On mobile, height reduces to `250px`.

**With `.full-size` modifier:** Image displays at its natural aspect ratio (`height: auto`, `object-fit: contain`) without cropping, capped at `max-height: 80vh`. The mobile `250px` height override is skipped, preserving the natural sizing on all screen sizes.

---

## 10. Partners Logos Scrolling Section

### 10.1 Overview

A pure CSS infinite horizontal scrolling carousel showcasing partner logos. Located on the home page ([`index.html`](index.html)) between the "What We Do" section and the footer.

### 10.2 Animation Mechanism

The scroll uses a seamless loop technique:
- The `.partners-track` contains **two identical sets** of logos
- CSS `@keyframes partnersScroll` animates `translateX` from `0` to `-50%`
- At `-50%`, the second set of logos occupies exactly where the first set started
- Animation resets to `0` instantly (visually seamless) and repeats

| Property | Value |
|----------|-------|
| Animation duration | `30s` (desktop), `20s` (mobile) |
| Timing function | `linear` (constant speed) |
| Iteration | `infinite` |
| Hover behavior | `animation-play-state: paused` |

### 10.3 Edge Fade Effect

The `.partners-track-wrapper` uses CSS `mask-image` to create a smooth fade at both edges:
- `transparent 0%` → `black 10%` → `black 90%` → `transparent 100%`
- Both standard (`mask-image`) and WebKit (`-webkit-mask-image`) prefixes included

### 10.4 Logo Styling

| State | Style |
|-------|-------|
| Default | `filter: grayscale(100%)`, `opacity: 0.6` |
| Hover | `filter: grayscale(0%)`, `opacity: 1`, parent scales to `1.05x` |

### 10.5 Accessibility

| Feature | Implementation |
|---------|---------------|
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables animation, falls back to static flex-wrap |
| Screen readers | Semantic `<h2>` heading + descriptive subtitle + `alt` on each logo |
| Hover pause | Animation pauses on track hover for examination |

### 10.6 Adding/Removing Partner Logos

To modify the list of partners:

1. Edit **both** sets of `.partner-logo` items in the track (original and duplicate must match)
2. Each logo item follows this pattern:
   ```html
   <div class="partner-logo">
       <img src="Images/LOGO-FILE.png" alt="Partner Name">
   </div>
   ```
3. The count of logos in each set **must be identical** for the seamless loop to work
4. Update `alt` attributes with actual partner names for accessibility

### 10.7 Adjusting Scroll Speed

Edit the animation duration in `style.css`:
```css
.partners-track {
    animation: partnersScroll 30s linear infinite;  /* Change 30s to desired duration */
}
```

More logos or wider logos = increase duration. Fewer logos = decrease duration.

---

## 11. Site Architecture Diagram

```mermaid
flowchart TD
    subgraph Pages["Pages"]
        A[index.html<br/>Home]
        B[about.html<br/>About]
        P[apartments-hotels.html<br/>Apartments & Hotels]
        R[ready-to-rent.html<br/>Ready to Rent]
        C[scans.html<br/>3D Scans]
        D[contact.html<br/>Contact]
        M[mural.html<br/>Murals]
        K[careers.html<br/>Careers]
    end

    subgraph Shared["Shared Resources"]
        E[style.css<br/>Stylesheet]
        F[theme.js<br/>Theme Manager]
        J[hours.js<br/>Business Hours Converter]
    end

    subgraph Assets["Assets"]
        G[Images<br/>Favicon, Hero, Logo, IRIS Logo]
        H[Models<br/>Cube.glb]
        I[HDR<br/>Environment Map]
    end

    A --> E
    B --> E
    P --> E
    R --> E
    C --> E
    D --> E
    M --> E
    A --> F
    B --> F
    P --> F
    R --> F
    C --> F
    D --> F
    M --> F
    A --> J
    B --> J
    P --> J
    R --> J
    C --> J
    D --> J
    M --> J
    A --> G
    B --> G
    C --> G
    D --> G
    M --> G
    A --> H
    C --> H
    A --> I
    C --> I
    A -->|What We Do: Custom Murals point| M
    M -->|CTA: Get a Quote| D
    P -->|Featured Program band| R
    P -->|Get a Quote CTA| D
    R -->|Get a Quote CTA| D
    K --> E
    K --> F
    K --> J
    K -->|Final CTA: Explore TryJax Projects| P
    K -->|External: View Current Openings| IN[Indeed (external job platform)]

    subgraph Header["Shared Header Component"]
        H1[Logo Image]
        H2[Nav Links: Home, About, Apartments & Hotels, Ready to Rent, 3D Imaging, Murals, Careers, Contact]
        H3[Theme Toggle]
    end

    subgraph Footer["Shared Footer Component"]
        F1[Navigation Links]
        F2[Contact Info]
        F3[Business Hours (via hours.js)]
        F4[Copyright Bottom Bar]
    end

    H1 -.-> G
    H2 -.-> A
    H2 -.-> B
    H2 -.-> P
    H2 -.-> R
    H2 -.-> C
```

---

## 12. Quick Reference — All CSS Classes

| Class | Selector | Purpose |
|-------|----------|---------|
| `container` | `.container` | Centered content wrapper at 80% width |
| `hero` | `.hero` | Full-width hero section with background image |
| `section` | `.section` | Generic section with vertical padding |
| `bg-light` | `.bg-light` | Alternating background color |
| `section-title` | `.section-title` | Section heading with extra bottom margin |
| `rtr-band` | `.rtr-band` | Dark feature band (header background + header-colored text) for the Ready to Rent program sections |
| `eyebrow` | `.eyebrow` | Uppercase accent eyebrow label above section headings |
| `price` | `.price` | Large bold price display inside service cards |
| `checks` | `.checks` | Auto-fit grid of check-mark program highlights |
| `offer` | `.offer` | Dashed-border pilot-offer box (paragraph + button) |
| `ptable` | `.ptable` | Flat pricing table (Ready to Rent) |
| `faq details` | `.faq details` | FAQ accordion item (card-styled `<details>`) |
| `faq summary` | `.faq summary` | Bold FAQ question (`<summary>`) |
| `btn-ghost` | `.btn-ghost` | Ghost (outline) hero button; accent fill on hover |
| `hero .btn` | `.hero .btn` | Margins between side-by-side hero buttons |
| `.skip-link` | `.skip-link` | Keyboard skip-to-content link; visually hidden until focused |
| `.header-jobs-btn` | `.header-jobs-btn` | External "View Open Positions" header button (careers page) |
| `.hero-eyebrow` | `.hero-eyebrow` | Hero eyebrow label variant (careers page) |
| `.hero-note` | `.hero-note` | External-hosting note below hero CTAs (careers page) |
| `.section-intro` | `.section-intro` | Centered max-width section intro paragraph |
| `.notice` | `.notice` | Left-bordered disclosure box; `.pay-notice` variant for pay-range notice |
| `.steps` | `.steps` | Numbered application-steps list (careers page) |
| `btn` | `.btn` | Primary accent button |
| `submit-btn` | `.submit-btn` | Full-width submit button variant |
| `services-grid` | `.services-grid` | Auto-fit grid for service cards |
| `service-card` | `.service-card` | Card with border, shadow, centered content |
| `team-grid` | `.team-grid` | Auto-fit grid for team member cards |
| `team-card` | `.team-card` | Card with circular avatar, name, role, bio |
| `clients-grid` | `.clients-grid` | Auto-fit grid for client logos |
| `client-card` | `.client-card` | Square card with hover lift effect |
| `map-figure` | `.map-figure` | Semantic figure wrapper for US coverage map image |
| `partners-section` | `.partners-section` | Partners logos scrolling carousel section |
| `partners-track-wrapper` | `.partners-track-wrapper` | Overflow container with edge-fade mask |
| `partners-track` | `.partners-track` | Animated flex row with infinite scroll keyframes |
| `partner-logo` | `.partner-logo` | Individual logo card with grayscale filter and hover effects |
| `theme-toggle` | `.theme-toggle` | Dark/light mode toggle button |
| `form-container` | `.form-container` | Centered card-style form wrapper |
| `form-row` | `.form-row` | Two-column form field layout |
| `form-group` | `.form-group` | Single form field with label |
| `content-row` | `.content-row` | Side-by-side image and text layout |
| `content-row.reverse` | `.content-row.reverse` | Reversed content row (image right) |
| `content-image` | `.content-image` | Image column in content rows |
| `content-image-placeholder` | `.content-image-placeholder` | Custom Murals row gradient placeholder tile (matches `.mural-tile` aesthetic) |
| `content-text` | `.content-text` | Text column in content rows |
| `partner-showcase` | `.partner-showcase` | Centered layout for partner company logo and description |
| `iris-logo` | `<img>` | Base class for IRIS logo images |
| `iris-logo-light` | `<img>` | IRIS logo visible in light mode (`display: block`), hidden in dark mode |
| `iris-logo-dark` | `<img>` | IRIS logo visible in dark mode (`display: block`), hidden in light mode |
| `footer-grid` | `.footer-grid` | 3-column grid layout for footer content columns |
| `footer-column` | `.footer-column` | Individual footer column with title and content |
| `footer-bottom` | `.footer-bottom` | Footer copyright bar with top border separator |
| `mural-gallery` | `.mural-gallery` | Auto-fit grid for the mural gallery photo tiles |
| `mural-tile` | `.mural-tile` | Mural gallery tile (fixed 220px height, `overflow: hidden`, hover lift) |
| `mural-tile img` | `.mural-tile img` | Constrains any photo inside a mural tile: `display: block; width: 100%; height: 100%; object-fit: cover;` |
| `mural-tile-1` | `.mural-tile-1` | Gallery tile 1 — holds `Images/Mural_1.JPG` (per-tile gradient variant still defined in CSS) |
| `mural-tile-2` | `.mural-tile-2` | Gallery tile 2 — holds `Images/Mural_2.JPG` (per-tile gradient variant still defined in CSS) |
| `mural-tile-3` | `.mural-tile-3` | Gallery tile 3 — holds `Images/Mural_3.webp` (per-tile gradient variant still defined in CSS) |
| `mural-tile-4` | `.mural-tile-4` | Gallery tile 4 — holds `Images/Mural_4.webp` (per-tile gradient variant still defined in CSS) |
| `mural-tile-5` | `.mural-tile-5` | Gallery tile 5 — holds `Images/Mural_5.webp` (per-tile gradient variant still defined in CSS) |
| `mural-tile-6` | `.mural-tile-6` | Gallery tile 6 — holds `Images/Mural_6.webp` (per-tile gradient variant still defined in CSS) |

---

*Document generated for the Tryjax Construction website codebase. Keep this file updated as the site evolves.*
