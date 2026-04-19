import { formatDate } from '../lib/rentCalculations'

export function generateComplaintLetter({
  tenantName, landlordName, address, previousRent, proposedRent,
  percentageIncrease, roomType, effectiveDate, neighborhood,
}) {
  const today      = formatDate(new Date().toISOString().split('T')[0])
  const effectDate = formatDate(effectiveDate)
  const prevFmt    = parseFloat(previousRent).toLocaleString()
  const propFmt    = parseFloat(proposedRent).toLocaleString()
  const compFmt    = Math.round(parseFloat(previousRent) * 1.1).toLocaleString()
  const pctFmt     = percentageIncrease.toFixed(1)
  const refCode    = `RCD/${neighborhood.replace(/\s/g, '-').toUpperCase()}/${Date.now().toString().slice(-6)}`

  return `FORMAL COMPLAINT — RENT CONTROL DEPARTMENT
Greater Accra Region, Republic of Ghana
════════════════════════════════════════════════════════════

Date      : ${today}
Reference : ${refCode}


THE DIRECTOR
Rent Control Department
Greater Accra Region
Accra, Ghana


RE: COMPLAINT OF EXCESSIVE / UNLAWFUL RENT INCREASE — ${address}

Sir / Madam,

════════════════════════════════════════════════════════════
DETAILS OF COMPLAINANT (TENANT)
════════════════════════════════════════════════════════════

  Full Name     : ${tenantName}
  Address       : ${address}, ${neighborhood}
  Property Type : ${roomType}

════════════════════════════════════════════════════════════
DETAILS OF RESPONDENT (LANDLORD)
════════════════════════════════════════════════════════════

  Full Name     : ${landlordName}
  Property      : ${address}, ${neighborhood}

════════════════════════════════════════════════════════════
PARTICULARS OF COMPLAINT
════════════════════════════════════════════════════════════

1. I am a tenant occupying a ${roomType} at the above address and have been
   paying a monthly rent of GHS ${prevFmt}.

2. My landlord, ${landlordName}, has proposed to increase the monthly rent
   to GHS ${propFmt}, effective ${effectDate}, representing an increase
   of ${pctFmt}% — far in excess of the prevailing market rate.

3. This increase was communicated without proper written notice as required
   under the Ghana Rent Act, 1963 (Act 220).

4. I formally objected to this increase in writing on ${today}, proposing
   a fair compromise of GHS ${compFmt} per month (a 10% increase consistent
   with market rates in ${neighborhood}).

5. The landlord has not responded satisfactorily, leaving me no recourse
   but to file this formal complaint.

════════════════════════════════════════════════════════════
RELIEF SOUGHT
════════════════════════════════════════════════════════════

I respectfully pray that this Department:

  (a) Investigate the proposed rent increase and determine its lawfulness
      under the Ghana Rent Act, 1963 (Act 220);

  (b) Mediate between myself and the landlord to reach a fair and
      lawful resolution;

  (c) Issue a binding directive as to the appropriate rent chargeable
      for the said premises; and

  (d) Take any further steps necessary to protect my rights as a tenant
      under Ghanaian law.

════════════════════════════════════════════════════════════
DOCUMENTS ATTACHED
════════════════════════════════════════════════════════════

  [ ] Copy of formal objection letter delivered to landlord
  [ ] Rent payment receipts (most recent 3 months)
  [ ] Any written communication from landlord

I affirm that all information provided in this complaint is true and
accurate to the best of my knowledge and belief.

Yours faithfully,



_______________________________
${tenantName}
Complainant / Tenant
Date: ${today}
Address: ${address}, ${neighborhood}

════════════════════════════════════════════════════════════
FOR OFFICIAL USE ONLY

Received by : _______________________  Date : _______________
File No.    : _______________________  Signature : ___________
Action Taken: __________________________________________________
════════════════════════════════════════════════════════════
`
}
