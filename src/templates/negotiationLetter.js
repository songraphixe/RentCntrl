import { getCompromiseRate, formatDate } from '../lib/rentCalculations'

export function generateNegotiationLetter({
  tenantName, landlordName, address, previousRent, proposedRent,
  percentageIncrease, roomType, effectiveDate, neighborhood,
}) {
  const today      = formatDate(new Date().toISOString().split('T')[0])
  const effectDate = formatDate(effectiveDate)
  const compromise = getCompromiseRate(previousRent)
  const prevFmt    = parseFloat(previousRent).toLocaleString()
  const propFmt    = parseFloat(proposedRent).toLocaleString()
  const compFmt    = compromise.toLocaleString()
  const pctFmt     = percentageIncrease.toFixed(1)

  return `${tenantName}
${address}
${neighborhood}, Greater Accra
${today}


${landlordName}
[Landlord's Address]
${neighborhood}, Greater Accra


RE: FORMAL OBJECTION TO PROPOSED RENT INCREASE — ${address}

Dear ${landlordName},

I write with due respect to formally register my objection to the proposed rent
increase at the ${roomType} I occupy at ${address}, ${neighborhood}.

I have been informed that the monthly rent is proposed to increase from
GHS ${prevFmt} to GHS ${propFmt}, effective ${effectDate}, representing
an increase of ${pctFmt}%.

────────────────────────────────────────────
LEGAL POSITION — GHANA RENT ACT, 1963 (ACT 220)
────────────────────────────────────────────

Under the provisions of the Ghana Rent Act, 1963 (Act 220), a landlord is required
to provide proper written notice before any rent increase may take effect.
Furthermore, it is unlawful to demand more than six (6) months' advance rent from
any tenant.

The proposed increase of ${pctFmt}% significantly exceeds the prevailing market
rate for comparable accommodation in ${neighborhood} and appears inconsistent
with the spirit and provisions of Act 220, which seeks to protect tenants from
arbitrary and excessive rent increases.

────────────────────────────────────────────
PROPOSED COMPROMISE
────────────────────────────────────────────

In a spirit of goodwill and to avoid recourse to the Rent Control Department,
I propose the following arrangement:

  Revised Monthly Rent : GHS ${compFmt} (a 10% increase on current rent)
  Lease Term           : A renewed commitment of twelve (12) months
  Advance Payment      : Not to exceed two (2) months, per Act 220

I trust that you will give this proposal your favourable consideration.

Please respond in writing within fourteen (14) days of receipt of this letter.
Should I not receive a satisfactory response, I reserve the right to escalate
this matter to the Rent Control Department, Greater Accra Region, in full
exercise of my rights under Act 220.

I appreciate the accommodation you have provided and sincerely hope we can
continue our tenancy arrangement on fair and lawful terms.

Yours faithfully,



_______________________________
${tenantName}
Tenant — ${address}
Date: ${today}


[For official use / Stamp if hand-delivered]
`
}
