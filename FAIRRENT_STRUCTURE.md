# FairRent Ghana — Application Structure

**Target Audience:** Tenants in Tema Community 23, Ghana  
**Stack:** React + Tailwind CSS (Frontend) · Supabase (Backend/DB)  
**Constraint:** Zero external AI APIs — all text generation is client-side template interpolation.

---

## 1. Project Directory Layout

```
fairrent-ghana/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── ghana-coat-of-arms.png
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── dashboard/
│   │   │   ├── RentInputForm.jsx
│   │   │   ├── RentCalculator.jsx
│   │   │   └── MarketCompare.jsx
│   │   ├── legal/
│   │   │   ├── Act220Notice.jsx
│   │   │   └── TenantRightsSidebar.jsx
│   │   ├── negotiation/
│   │   │   ├── NegotiationLetter.jsx
│   │   │   └── LetterPreview.jsx
│   │   ├── escalation/
│   │   │   ├── EscalationPortal.jsx
│   │   │   └── ComplaintPDF.jsx
│   │   └── lease/
│   │       ├── LeaseForm.jsx
│   │       └── LeasePreview.jsx
│   ├── pages/
│   │   ├── Home.jsx               ← Dashboard / Rent Input
│   │   ├── LegalCheck.jsx         ← Act 220 + Market Average
│   │   ├── Negotiation.jsx        ← Letter Generator
│   │   ├── Escalation.jsx         ← Rent Control Portal
│   │   └── Lease.jsx              ← Digital Lease Agreement
│   ├── templates/
│   │   ├── negotiationLetter.js   ← Pre-written string template
│   │   ├── complaintLetter.js     ← Pre-written string template
│   │   └── leaseAgreement.js      ← Pre-written string template
│   ├── data/
│   │   └── marketRates.js         ← Hardcoded baseline rent data
│   ├── lib/
│   │   ├── supabaseClient.js      ← Supabase init
│   │   └── rentCalculations.js    ← Pure JS calculation helpers
│   ├── context/
│   │   └── RentContext.jsx        ← Global state (React Context)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                           ← SUPABASE_URL + SUPABASE_ANON_KEY
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 2. Pages & Routing

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home.jsx` | Rent input form + live % increase calc |
| `/legal` | `LegalCheck.jsx` | Act 220 notice + market rate comparison |
| `/negotiation` | `Negotiation.jsx` | Generate & print landlord letter |
| `/escalation` | `Escalation.jsx` | Generate Rent Control complaint |
| `/lease` | `Lease.jsx` | Generate & print lease agreement |

Navigation is linear (wizard-style) but each page is independently accessible.

---

## 3. Component Breakdown

### 3.1 RentInputForm (`src/components/dashboard/RentInputForm.jsx`)
**Inputs:**
- Neighborhood — text, default `"Tema Community 23"`
- Room Type — select: `Studio | 1 Bedroom | 2 Bedroom | 3 Bedroom`
- Landlord Name — text
- Property Address — text
- Previous Rent (GHS) — number
- Proposed New Rent (GHS) — number
- Effective Date — date picker

**Output:** Populates `RentContext` on submit.

---

### 3.2 RentCalculator (`src/components/dashboard/RentCalculator.jsx`)
**Logic (pure JS, no API):**
```
percentageIncrease = ((newRent - oldRent) / oldRent) * 100
```
**Display:**
- Green badge: increase ≤ 10%
- Amber badge: 10–25%
- Red badge: > 25% — triggers legal notice prompt

---

### 3.3 MarketCompare (`src/components/dashboard/MarketCompare.jsx`)
Reads from `src/data/marketRates.js`. Compares user's Previous Rent to the
community baseline and shows a bar chart (CSS-only, no library needed).

**Hardcoded Baselines — Tema Community 23:**
| Room Type | Baseline (GHS/month) |
|---|---|
| Studio | 800 |
| 1 Bedroom | 1,500 |
| 2 Bedroom | 2,200 |
| 3 Bedroom | 3,000 |

---

### 3.4 Act220Notice (`src/components/legal/Act220Notice.jsx`)
Static info card. Shown whenever increase > 10%.  
Key points pulled from **Ghana Rent Act, 1963 (Act 220)**:
- Landlord must give written notice before any rent increase.
- No more than **6 months' advance rent** may be demanded.
- Tenant has the right to dispute increases at the Rent Control Department.
- Unlawful eviction is a criminal offence.

---

### 3.5 NegotiationLetter (`src/components/negotiation/NegotiationLetter.jsx`)
- Only renders when `percentageIncrease > 10`
- Calls `templates/negotiationLetter.js` with user variables
- Shows live preview in a styled `<div>` that mirrors print output
- "Print / Save as PDF" button triggers `window.print()`

---

### 3.6 EscalationPortal (`src/components/escalation/EscalationPortal.jsx`)
- Appears after Negotiation Letter step
- Toggle: "Has landlord responded?" — if No → show escalation
- Calls `templates/complaintLetter.js`
- Addressed to: **Rent Control Department, Greater Accra Region**
- Fields auto-filled from `RentContext`

---

### 3.7 LeaseForm + LeasePreview (`src/components/lease/`)
- Inputs: Tenant name, Landlord name, Address, Agreed Rent, Lease Start,
  Lease Duration (12 or 24 months), Renewal Terms
- Calls `templates/leaseAgreement.js`
- Output: full legal-style document with signature lines
- "Print / Save as PDF" button

---

## 4. Template Files (Client-Side Text Generation)

All templates are JavaScript functions returning string literals. **No API calls.**

### 4.1 `src/templates/negotiationLetter.js`
```js
export function generateNegotiationLetter({ tenantName, landlordName,
  address, previousRent, proposedRent, percentageIncrease,
  roomType, date, neighborhood }) {
  return `
[Tenant Name]: ${tenantName}
[Address]: ${address}
[Date]: ${date}

To: ${landlordName}
Re: Formal Objection to Rent Increase — ${address}

Dear ${landlordName},

I write with respect regarding the proposed rent increase from
GHS ${previousRent} to GHS ${proposedRent} (${percentageIncrease.toFixed(1)}%)
for the ${roomType} I occupy at ${address}, ${neighborhood}.

Under the Ghana Rent Act of 1963 (Act 220), a landlord may not demand
an arbitrary rent increase without proper written notice, nor require
more than six (6) months' advance rent. The current proposed increase
of ${percentageIncrease.toFixed(1)}% significantly exceeds the market
average for ${neighborhood} and may be inconsistent with Act 220.

I respectfully propose a compromise rate of GHS ${Math.round(previousRent * 1.1)}
per month, representing a 10% increase, which I am prepared to honour
with a renewed lease commitment of 12 months.

I trust we can resolve this matter amicably without recourse to the
Rent Control Department. Please respond within 14 days.

Yours faithfully,
${tenantName}
  `.trim();
}
```

### 4.2 `src/templates/complaintLetter.js`
```js
export function generateComplaintLetter({ tenantName, landlordName,
  address, previousRent, proposedRent, percentageIncrease,
  roomType, date, neighborhood }) {
  return `
FORMAL COMPLAINT — RENT CONTROL DEPARTMENT
Greater Accra Region, Ghana
Date: ${date}

Complainant: ${tenantName}
Respondent (Landlord): ${landlordName}
Property: ${address}, ${neighborhood}

PARTICULARS OF COMPLAINT:
My landlord, ${landlordName}, has proposed to increase my monthly rent
for a ${roomType} at the above address from GHS ${previousRent}
to GHS ${proposedRent}, representing an increase of ${percentageIncrease.toFixed(1)}%.

This increase was made without proper written notice as required under
the Ghana Rent Act 1963 (Act 220). I have formally objected in writing
and received no satisfactory response.

I respectfully request the Department investigate this matter and
intervene to enforce my rights under Act 220.

Signed: ${tenantName}
Date: ${date}
  `.trim();
}
```

### 4.3 `src/templates/leaseAgreement.js`
```js
export function generateLeaseAgreement({ tenantName, landlordName,
  address, agreedRent, startDate, durationMonths, renewalTerms }) {
  // Returns full multi-clause lease string
}
```
Full lease clauses: Parties, Premises, Term, Rent, Obligations,
Maintenance, Termination, Renewal, Governing Law (Ghana).

---

## 5. Global State — RentContext

```js
// src/context/RentContext.jsx
{
  neighborhood: "Tema Community 23",
  roomType: "",
  landlordName: "",
  address: "",
  previousRent: null,
  proposedRent: null,
  percentageIncrease: null,
  tenantName: "",
  effectiveDate: "",
  landlordRejected: false
}
```

---

## 6. Supabase Database Schema

```sql
-- Enable RLS on all tables

-- Table: rent_records
CREATE TABLE rent_records (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tenant_name   TEXT NOT NULL,
  landlord_name TEXT NOT NULL,
  address       TEXT NOT NULL,
  neighborhood  TEXT NOT NULL DEFAULT 'Tema Community 23',
  room_type     TEXT NOT NULL CHECK (room_type IN ('Studio','1 Bedroom','2 Bedroom','3 Bedroom')),
  previous_rent NUMERIC(10,2) NOT NULL,
  proposed_rent NUMERIC(10,2) NOT NULL,
  pct_increase  NUMERIC(5,2) GENERATED ALWAYS AS
                  (ROUND(((proposed_rent - previous_rent) / previous_rent) * 100, 2)) STORED,
  effective_date DATE NOT NULL
);

-- Table: letters_sent
CREATE TABLE letters_sent (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  rent_record_id UUID REFERENCES rent_records(id) ON DELETE CASCADE,
  letter_type    TEXT NOT NULL CHECK (letter_type IN ('negotiation','complaint')),
  letter_body    TEXT NOT NULL,
  sent_at        TIMESTAMPTZ
);

-- Table: lease_agreements
CREATE TABLE lease_agreements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  rent_record_id  UUID REFERENCES rent_records(id) ON DELETE CASCADE,
  agreed_rent     NUMERIC(10,2) NOT NULL,
  lease_start     DATE NOT NULL,
  duration_months INTEGER NOT NULL CHECK (duration_months IN (12, 24)),
  renewal_terms   TEXT,
  agreement_body  TEXT NOT NULL,
  signed_at       TIMESTAMPTZ
);

-- Row Level Security policies (add after enabling RLS)
ALTER TABLE rent_records     ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters_sent     ENABLE ROW LEVEL SECURITY;
ALTER TABLE lease_agreements ENABLE ROW LEVEL SECURITY;

-- Allow public insert/select for MVP (lock down with auth later)
CREATE POLICY "public_insert" ON rent_records     FOR INSERT WITH CHECK (true);
CREATE POLICY "public_select" ON rent_records     FOR SELECT USING (true);
CREATE POLICY "public_insert" ON letters_sent     FOR INSERT WITH CHECK (true);
CREATE POLICY "public_select" ON letters_sent     FOR SELECT USING (true);
CREATE POLICY "public_insert" ON lease_agreements FOR INSERT WITH CHECK (true);
CREATE POLICY "public_select" ON lease_agreements FOR SELECT USING (true);
```

---

## 7. Key Libraries & Dependencies

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "@supabase/supabase-js": "^2"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "^4",
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

No charting library — use CSS flexbox for the market comparison bar.  
No PDF library — use `window.print()` with a `@media print` stylesheet.

---

## 8. Environment Variables (`.env`)

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 9. User Flow (Step-by-Step)

```
[Home] Fill Rent Input Form
        ↓
[Home] See % increase + color badge
        ↓ (if > 10%)
[Legal] View Act 220 Notice + Market Comparison
        ↓
[Negotiation] Preview & Print landlord letter
        ↓ (if landlord rejects)
[Escalation] Preview & Print Rent Control complaint
        ↓
[Lease] Fill Lease Form → Preview & Print lease agreement
```

---

## 10. UI Design Tokens (Tailwind)

| Token | Value | Use |
|---|---|---|
| Primary | `green-700` | Ghana flag green, CTA buttons |
| Accent | `yellow-400` | Ghana flag gold, highlights |
| Danger | `red-600` | High increase badge, warnings |
| Warning | `amber-500` | Moderate increase badge |
| Surface | `white` / `gray-50` | Card backgrounds |
| Text | `gray-900` | Body copy |
| Font | System sans-serif | Tailwind default |

Mobile-first breakpoints: `sm (640px)` · `md (768px)` · `lg (1024px)`

---

## 11. Print Stylesheet Strategy

Each generated document page gets a `printable-zone` CSS class.

```css
@media print {
  body > *:not(.printable-zone) { display: none; }
  .printable-zone { display: block; font-family: serif; font-size: 12pt; }
}
```

No third-party PDF library required — browser's "Save as PDF" handles output.

---

## 12. Build & Run

```bash
# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

Supabase setup:
1. Create project at supabase.com
2. Run SQL schema from Section 6 in the SQL Editor
3. Copy URL + anon key into `.env`

---

*Document version 1.0 — ready for implementation.*
