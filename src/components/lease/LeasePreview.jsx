import { useRent } from '../../context/RentContext'
import { generateLeaseAgreement } from '../../templates/leaseAgreement'
import { supabase } from '../../lib/supabaseClient'

export default function LeasePreview() {
  const { rentData } = useRent()

  const isReady = Boolean(
    rentData.tenantName &&
    rentData.landlordName &&
    rentData.address &&
    rentData.agreedRent &&
    rentData.leaseStart,
  )

  if (!isReady) {
    return (
      <div className="card text-center py-12 border-2 border-dashed border-gray-200">
        <span className="text-4xl mb-3 block">📄</span>
        <p className="font-black text-[#064e3b] uppercase tracking-wide text-sm mb-1">
          Preview Not Ready
        </p>
        <p className="text-sm text-gray-500">Complete all fields above to preview the lease agreement.</p>
      </div>
    )
  }

  const agreement = generateLeaseAgreement({
    tenantName:    rentData.tenantName,
    landlordName:  rentData.landlordName,
    address:       rentData.address,
    agreedRent:    rentData.agreedRent,
    leaseStart:    rentData.leaseStart,
    leaseDuration: rentData.leaseDuration,
    renewalTerms:  rentData.renewalTerms,
    neighborhood:  rentData.neighborhood,
  })

  async function handlePrint() {
    try {
      if (supabase && rentData.currentRecordId) {
        await supabase.from('lease_agreements').insert({
          rent_record_id:  rentData.currentRecordId,
          agreed_rent:     parseFloat(rentData.agreedRent),
          lease_start:     rentData.leaseStart,
          duration_months: parseInt(rentData.leaseDuration),
          renewal_terms:   rentData.renewalTerms,
          agreement_body:  agreement,
        })
      }
    } catch { /* non-critical */ }
    window.print()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
        <h3 className="font-black text-[#064e3b] uppercase tracking-wide text-sm">
          Lease Agreement Preview
        </h3>
        <button onClick={handlePrint} className="btn-primary flex items-center gap-2 shrink-0">
          🖨 Print / Save as PDF
        </button>
      </div>

      <div className="printable-zone card bg-white overflow-x-auto">
        <pre className="whitespace-pre-wrap font-serif text-sm text-gray-900 leading-relaxed min-w-0">
          {agreement}
        </pre>
      </div>
    </div>
  )
}
