import { formatDate } from '../lib/rentCalculations'

export function generateLeaseAgreement({
  tenantName, landlordName, address, agreedRent,
  leaseStart, leaseDuration, renewalTerms, neighborhood,
}) {
  const today    = formatDate(new Date().toISOString().split('T')[0])
  const start    = formatDate(leaseStart)
  const months   = parseInt(leaseDuration)
  const endObj   = new Date(leaseStart + 'T00:00:00')
  endObj.setMonth(endObj.getMonth() + months)
  const end      = formatDate(endObj.toISOString().split('T')[0])
  const rentFmt  = parseFloat(agreedRent).toLocaleString()
  const yearFmt  = (parseFloat(agreedRent) * 12).toLocaleString()

  return `RESIDENTIAL LEASE AGREEMENT
════════════════════════════════════════════════════════════════

This Residential Lease Agreement ("Agreement") is entered into on
${today}, between the parties identified below, and is governed by
the laws of the Republic of Ghana, including the Ghana Rent Act,
1963 (Act 220).

════════════════════════════════════════════════════════════════
CLAUSE 1 — PARTIES
════════════════════════════════════════════════════════════════

  LANDLORD : ${landlordName}
             [Landlord's full address to be inserted]

  TENANT   : ${tenantName}
             ${address}, ${neighborhood}

════════════════════════════════════════════════════════════════
CLAUSE 2 — PREMISES
════════════════════════════════════════════════════════════════

The Landlord hereby lets to the Tenant the residential premises at:

    ${address}, ${neighborhood}, Greater Accra Region, Ghana

(hereinafter referred to as "the Premises").

════════════════════════════════════════════════════════════════
CLAUSE 3 — TERM
════════════════════════════════════════════════════════════════

3.1  This tenancy shall commence on ${start} and shall expire on
     ${end}, a period of ${months} months ("the Term"), unless sooner
     terminated in accordance with the provisions of this Agreement.

3.2  At expiry of the Term, the tenancy shall NOT automatically
     renew unless both parties execute a written renewal agreement.

════════════════════════════════════════════════════════════════
CLAUSE 4 — RENT
════════════════════════════════════════════════════════════════

4.1  The monthly rent for the Premises shall be:

         GHS ${rentFmt} per month
         (Total over ${months}-month term: GHS ${yearFmt})

4.2  Rent is payable in advance on or before the 1st day of each
     calendar month.

4.3  The Landlord shall issue a written receipt for every rent
     payment received.

4.4  In accordance with Section 25 of the Ghana Rent Act, 1963,
     the Landlord shall NOT demand more than six (6) months'
     advance rent at any one time.

4.5  Any rent increase after expiry of this Agreement must be
     preceded by proper written notice and shall comply with Act 220.

════════════════════════════════════════════════════════════════
CLAUSE 5 — TENANT'S OBLIGATIONS
════════════════════════════════════════════════════════════════

The Tenant agrees to:

5.1  Pay rent promptly on the due date each month.
5.2  Use the Premises solely for residential purposes.
5.3  Keep the Premises clean, tidy, and in good repair (reasonable
     wear and tear excepted).
5.4  Not sub-let or assign the Premises without prior written
     consent from the Landlord.
5.5  Not make structural alterations without the Landlord's written
     approval.
5.6  Comply with all applicable laws and not cause nuisance to
     neighbouring occupants.
5.7  Permit the Landlord reasonable access for inspections upon
     48 hours' written notice.
5.8  Report any defects or necessary repairs to the Landlord
     promptly in writing.

════════════════════════════════════════════════════════════════
CLAUSE 6 — LANDLORD'S OBLIGATIONS
════════════════════════════════════════════════════════════════

The Landlord agrees to:

6.1  Ensure the Premises are habitable and in good repair at the
     commencement of the tenancy.
6.2  Maintain the structural integrity of the building throughout
     the Term.
6.3  Ensure access to water and sanitation facilities.
6.4  Issue rent receipts for all payments received.
6.5  Give at least one (1) month's written notice before any
     intended rent increase after expiry of the Term.
6.6  Not enter the Premises without the Tenant's prior consent,
     except in genuine emergencies.

════════════════════════════════════════════════════════════════
CLAUSE 7 — UTILITIES & SERVICES
════════════════════════════════════════════════════════════════

7.1  Electricity and water charges shall be paid by the Tenant
     directly to the relevant utility provider.
7.2  Any communal service charges (refuse collection, security,
     etc.) shall be agreed separately in writing.

════════════════════════════════════════════════════════════════
CLAUSE 8 — SECURITY DEPOSIT
════════════════════════════════════════════════════════════════

8.1  A security deposit of [AMOUNT — to be agreed and inserted]
     is payable upon execution of this Agreement.
8.2  The deposit shall be refunded within 30 days after termination,
     less any deductions for damage beyond reasonable wear and tear.
8.3  The Landlord shall provide an itemised account of any deductions.

════════════════════════════════════════════════════════════════
CLAUSE 9 — TERMINATION
════════════════════════════════════════════════════════════════

9.1  Either party may terminate this Agreement by giving one (1)
     month's written notice prior to the expiry of the Term.
9.2  The Landlord may terminate immediately if the Tenant:
     (a) fails to pay rent for two consecutive months;
     (b) sub-lets without written consent; or
     (c) causes serious or wilful damage to the Premises.
9.3  Eviction may only be carried out through lawful court
     proceedings. Self-help eviction is prohibited under Ghanaian law.

════════════════════════════════════════════════════════════════
CLAUSE 10 — RENEWAL
════════════════════════════════════════════════════════════════

${renewalTerms}

════════════════════════════════════════════════════════════════
CLAUSE 11 — DISPUTE RESOLUTION
════════════════════════════════════════════════════════════════

11.1 Any dispute arising from this Agreement shall first be resolved
     by good-faith negotiation between the parties.
11.2 Failing resolution within 14 days, either party may refer the
     dispute to the Rent Control Department, Greater Accra Region.
11.3 Court proceedings may be instituted as a last resort before
     a court of competent jurisdiction in Ghana.

════════════════════════════════════════════════════════════════
CLAUSE 12 — GOVERNING LAW
════════════════════════════════════════════════════════════════

This Agreement is governed by the laws of the Republic of Ghana,
including the Ghana Rent Act, 1963 (Act 220).

════════════════════════════════════════════════════════════════
SIGNATURES
════════════════════════════════════════════════════════════════

IN WITNESS WHEREOF the parties have executed this Agreement on the
date first written above.

LANDLORD:

  Signature  : _________________________________

  Full Name  : ${landlordName}

  Date       : _________________________________

  National ID: _________________________________


TENANT:

  Signature  : _________________________________

  Full Name  : ${tenantName}

  Date       : _________________________________

  National ID: _________________________________


WITNESS:

  Signature  : _________________________________

  Full Name  : _________________________________

  Date       : _________________________________

  National ID: _________________________________

════════════════════════════════════════════════════════════════
FairRent Ghana — Protecting Tenant Rights under the Ghana Rent Act (Act 220)
Document prepared: ${today}
════════════════════════════════════════════════════════════════
`
}
