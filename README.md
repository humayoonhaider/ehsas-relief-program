# احساس قومی ریلیف پورٹل (Ehsaas Qaumi Relief & Digital Empowerment Portal)

A production-grade, highly responsive public citizen welfare application portal designed for Pakistan. Provides dual application channels for direct **Rs. 10,000 Financial Relief Grants** and **Free 50GB 4G/5G Mobile Data Activations** across all major Pakistani telecom networks (Jazz, Zong, Telenor, Ufone).

Features integrated WhatsApp community outreach, live eligibility meters, unique Reference ID case tracking, bilingual Urdu & English localization, and full **Google AdSense compliance**.

---

## 🌟 Key Features

### 1. Dual Citizen Application Portals
- **Rs. 10,000 Cash Support Grant**: Multi-field applicant verification with direct mobile wallet disbursement support (Easypaisa, JazzCash, SadaPay, NayaPay, Bank Account).
- **Free 50GB Mobile Data Package**: SIM carrier selector and direct 30-day 4G/5G data activation queue.
- **Client-Side Format Validation**: Automatic real-time validation and formatting for Pakistani CNIC (13 digits: `XXXXX-XXXXXXX-X`) and mobile telephone numbers (`03XXXXXXXXX`).
- **Real-Time Reference Tracker (`/application-status`)**: Search by CNIC or unique Reference ID (e.g. `APP-2026-000101`) to view live evaluation timeline and notes.

### 2. High-Converting Pakistani Urgency Hook
- Prominent limited-time emergency relief notification banner.
- Real-time daily quota allocation progress meter (`1,280 / 5,000 remaining`).
- Official civic authority emblem: **حکومتِ پاکستان پبلک ویلفیئر و احساس ایمرجنسی ریلیف فنڈ 2026**.

### 3. Google AdSense & SEO Optimization
- **Mandatory Policy & Editorial Content**:
  - `/privacy-policy`: Comprehensive Google AdSense and DoubleClick DART cookie policy and opt-outs.
  - `/terms`: Terms of service, zero-fee declarations, and fraud warnings.
  - `/about`: Detailed public mission, transparency standards, and funding mechanisms.
  - `/guidelines`: Complete eligibility manual, PMT poverty score guidelines, and biometric rules.
  - `/faq`: Searchable frequently asked questions covering grant payouts, SIM networks, and appeals.
  - `/contact`: Dedicated citizen grievance desk, toll-free helpline (`0800-24624`), and office addresses.
  - `/disclaimer`: Scam warnings and bank PIN/OTP anti-phishing advisory.
- **AdSense Placement Standards**: Compliant `AdSenseSlot` units labeled with official `اشتہار • ADVERTISEMENT` headers.
- **Pre-configured Files**: `/public/ads.txt`, `/public/robots.txt`, and `/public/sitemap.xml`.
- **GDPR / ePrivacy Cookie Consent**: Integrated `CookieConsentBanner` remembering consent choices.

### 4. Comprehensive Admin Case Management Suite (`/admin`)
- **Dashboard**: Live KPI analytics, submission graphs, and case status counts.
- **Application Manager**: Full search, filtering, and export to CSV/JSON.
- **Dynamic Form Builder**: Custom form field editor with live preview.
- **Program & AdSense Settings**: Configure live Google AdSense Publisher ID (`ca-pub-XXXXXXXXXXXXX`), slots, and helpline numbers.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Pure Modular Custom CSS Design System with CSS variables (ultra-responsive across mobile and desktop)
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti (celebratory application submissions)
- **Deployment**: Vercel, Netlify, Cloudflare Pages, or GitHub Pages

---

## 🚀 Quick Setup & Run Locally

```bash
# 1. Clone your repository
git clone https://github.com/<your-username>/ehsaas-relief-portal.git
cd ehsaas-relief-portal

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 🌐 Instant Vercel Deployment

1. Create a new repository on GitHub (recommended: `ehsaas-relief-portal`).
2. Push your project code to GitHub.
3. Go to [vercel.com](https://vercel.com) and import the repository.
4. Deploy! The included `vercel.json` automatically manages client-side SPA routing.

---

## 📄 License & Attribution

Public Citizen Facilitation Initiative. Built for public empowerment and accessible digital welfare across Pakistan.

---

## 🌟 Key Features

### 1. Public Citizen Portal
- **Trustworthy Civic Landing Page**: Program highlights, zero-fee pledge, guidelines, and instant application status lookup without marketing bloat.
- **Multi-Step Dynamic Application Form**:
  - Step 1: Personal Information (Full Name, Father/Guardian, DOB, Gender, National ID/CNIC, Phone, WhatsApp, Email).
  - Step 2: Residential Address (Province, District, City, Area, Address).
  - Step 3: Household & Socio-economic status (Family members, Dependents, Employment, Monthly income, Tenancy).
  - Step 4: Statement & Need Reason with support for dynamic custom fields from Admin Form Builder.
  - Step 5: Review & Truth Declaration before submission.
- **Genuine Progress Bar**: Calculates actual progress based on completed active required fields (no fake progress).
- **Unique Reference Generation**: Automatic sequence generation (e.g. `APP-2026-000101`).
- **Application Status Tracker**: Allows applicants to search by Reference ID and view real-time case timeline, review notes, and status transitions.

### 2. WhatsApp Community Outreach
- **Prominent Outreach Mechanism**: Native WhatsApp Universal Link generation with pre-formatted campaign message.
- **Dynamic Variable Interpolation**: Injects `{PROGRAM_NAME}`, `{ORG_NAME}`, `{URL}`, and `{APP_ID}`.
- **Interaction Tracking**: Logs user intent/tap timestamps, session identifiers, and placement sources without claiming unprovable server receipt confirmations.
- **Live Simulator**: Admin panel features a real-time WhatsApp phone screen mockup simulator.

### 3. Comprehensive Admin Case Management Suite (`/admin`)
- **Dashboard**: High-level KPI cards, status distribution, daily submission trend, and recent outreach activity feed.
- **Applications Manager**: Full search (ID, name, phone, email, national ID), multi-status filters, outreach filter, sorting, and pagination.
- **Case Reviewer & Notes**: Complete case inspection, status updates with evaluation notes, and internal staff caseworker notes log.
- **Dynamic Form Builder**: Add, edit, reorder, and toggle active/inactive status of form fields across 9 input types (Text, Number, Email, Phone, Date, Select, Radio, Checkbox, Textarea).
- **Program Branding Settings**: Configure organization name, program title, guidelines, legal notices, contact emails, and CTAs.
- **WhatsApp Settings**: Global toggle, campaign URL, custom message template, and helpline phone.
- **Local Analytics**: Unfabricated metric breakdowns (status distribution, daily trends, income brackets, geographic dispersion).
- **Admin Staff & Roles**: Manage staff access (`Super Admin` vs `Case Reviewer`).
- **Audit Logs**: Chronological log of administrative actions, logins, status changes, and data modifications.
- **Data Management**: Export all data as JSON or CSV, restore JSON backups, and seed demo dataset.

---

## 🛠️ Tech Stack & Design System

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: **Pure Custom CSS Design System** using modular CSS variables (`--primary`, `--navy`, `--whatsapp-green`, `--surface`, etc.) — *Zero Tailwind CSS / Bootstrap / Material UI*.
- **Icons**: Lucide React
- **Animations / Confetti**: Canvas Confetti (for celebratory application submission)
- **Deployment Target**: Vercel SPA (with `vercel.json` rewrite routing)

---

## 📁 Folder Structure

```
/
├── vercel.json                 # Vercel SPA rewrite fallback configuration
├── package.json                # App dependencies and scripts
├── index.html                  # HTML entry point with metadata and typography
├── src/
│   ├── main.tsx                # React DOM root mounting
│   ├── App.tsx                 # Route declarations (Public + Admin)
│   ├── index.css               # Imports all modular CSS design files
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces (Application, FormField, Settings, etc.)
│   ├── utils/
│   │   ├── constants.ts        # Seed data, status configs, and default schemas
│   │   ├── formatters.ts       # Date, currency, text, and phone formatting utilities
│   │   ├── validation.ts       # Email, phone, date, and required field validators
│   │   └── generators.ts       # Application ID generator, CSV and JSON export helpers
│   ├── services/
│   │   ├── storageService.ts   # Centralized local storage layer with cross-tab event sync
│   │   ├── authService.ts      # Client session management & auth abstraction
│   │   ├── applicationService.ts# Submission handler, status transitions, search/filtering
│   │   ├── whatsappService.ts  # Link builder, token interpolation, and outreach logger
│   │   ├── settingsService.ts  # Program and form builder configuration service
│   │   └── analyticsService.ts # Real metric aggregator (no fabricated data)
│   ├── components/
│   │   ├── Navbar.tsx          # Public header with mobile offcanvas drawer
│   │   ├── Footer.tsx          # Public footer with privacy/terms modal triggers
│   │   ├── Button.tsx          # Accessible variant button component
│   │   ├── Input.tsx           # Form input with validation and helper text
│   │   ├── Select.tsx          # Form dropdown select
│   │   ├── Textarea.tsx        # Multi-line textarea
│   │   ├── RadioGroup.tsx      # Radio button options group
│   │   ├── Checkbox.tsx        # Checkbox input with label
│   │   ├── ProgressBar.tsx     # Multi-step stepper & actual calculated percentage bar
│   │   ├── StatusBadge.tsx     # Color-coded status badge
│   │   ├── ShareButton.tsx     # WhatsApp prominent share button & banner
│   │   ├── ApplicationCard.tsx # Mobile-optimized application summary card
│   │   ├── ApplicationTable.tsx# Case management data table with sorting and pagination
│   │   ├── Modal.tsx           # Accessible modal dialog
│   │   ├── ConfirmDialog.tsx   # Destructive action confirmation dialog
│   │   ├── EmptyState.tsx      # Empty dataset placeholder
│   │   └── LoadingState.tsx    # Animated skeleton loader
│   ├── pages/
│   │   ├── Home.tsx            # Public landing page with quick status lookup
│   │   ├── Apply.tsx           # Multi-step responsive application form
│   │   └── ApplicationStatus.tsx # Public application status and timeline tracker
│   ├── admin/
│   │   ├── AdminLayout.tsx     # Admin shell with sidebar, topbar, and mobile drawer
│   │   ├── AdminLogin.tsx      # Admin authentication with quick demo autofill
│   │   ├── Dashboard.tsx       # KPI metrics, status cards, and recent activity
│   │   ├── Applications.tsx    # Search, multi-filter, sort, and batch CSV export
│   │   ├── ApplicationDetails.tsx # Detailed case file, caseworker notes, status updater
│   │   ├── FormBuilder.tsx     # Visual dynamic field creator with live preview
│   │   ├── ProgramSettings.tsx # Organization branding and copy editor
│   │   ├── WhatsAppSettingsPage.tsx # Message template editor with live phone simulator
│   │   ├── Analytics.tsx       # Visual status distributions and demographic charts
│   │   ├── Admins.tsx          # Staff account management
│   │   ├── AuditLogs.tsx       # Chronological audit trail
│   │   └── DataManagement.tsx  # JSON backup export/import and demo data reset
│   └── styles/
│       ├── variables.css       # Design tokens (colors, radii, elevation shadows)
│       ├── globals.css         # Reset, typography, accessibility focus styles
│       ├── components.css      # Buttons, cards, badges, inputs, alerts, modals
│       ├── admin.css           # Admin dual-pane layout, phone simulator, chart bars
│       └── responsive.css      # Mobile breakpoints and touch optimizations
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

### 4. Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. The included `vercel.json` automatically handles SPA route rewrites to `index.html`.
4. Deploy! No backend or database configuration required.

---

## 🔐 Architecture & Frontend Storage Explanation

This application operates with a **service abstraction architecture**:
- **Persistence**: All data operations run through `src/services/storageService.ts`, which persists data safely to browser `localStorage` and emits synchronizing events.
- **WhatsApp Outreach Tracking**: The system tracks user interaction intents (e.g. clicking "Share on WhatsApp"), associating timestamps and session IDs with cases. Because there is no backend server or WhatsApp webhook receiver in a client-only architecture, the system clearly and honestly labels this metric as *Share Initiated* rather than falsely claiming delivery or read receipts.
- **Admin Authentication**: Handled via `src/services/authService.ts`. Demo credentials (`admin@citizengrantportal.org`) are provided for demonstration.

---

## 🔄 Future Backend Migration Guide

Because the application strictly separates the UI layer from data fetching using dedicated services (`storageService`, `authService`, `applicationService`, `whatsappService`, `settingsService`, `analyticsService`), migrating to a full-stack Node/Express/PostgreSQL backend requires **zero changes to React components**:

1. In `src/services/applicationService.ts`, replace `storageService.getApplications()` with `fetch('/api/applications')`.
2. In `src/services/authService.ts`, replace local credential checks with `fetch('/api/auth/login')` and store the JWT in standard HTTP cookies or headers.
3. In `src/services/whatsappService.ts`, point interaction tracking to a backend telemetry endpoint `POST /api/outreach/track`.
4. The React forms, Form Builder, status tracking UI, and Admin dashboard will continue to function seamlessly.
