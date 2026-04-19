import { useRent } from '../../context/RentContext'
import { generateComplaintLetter } from '../../templates/complaintLetter'
import LetterPreview from '../negotiation/LetterPreview'

export default function ComplaintPDF() {
  const { rentData } = useRent()

  const letter = generateComplaintLetter({
    tenantName:         rentData.tenantName,
    landlordName:       rentData.landlordName,
    address:            rentData.address,
    previousRent:       rentData.previousRent,
    proposedRent:       rentData.proposedRent,
    percentageIncrease: rentData.percentageIncrease,
    roomType:           rentData.roomType,
    effectiveDate:      rentData.effectiveDate,
    neighborhood:       rentData.neighborhood,
  })

  return (
    <div className="space-y-4">
      <div className="card border-l-4 border-red-500 bg-red-50 no-print">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">⚠️</span>
          <div>
            <p className="font-black text-red-800 uppercase tracking-wide text-sm">
              Formal Complaint — Rent Control Department
            </p>
            <p className="text-sm text-red-700 mt-1 leading-relaxed">
              Edit the complaint if needed, then email it or print and submit in person.
              Bring your ID and any supporting documents.
            </p>
          </div>
        </div>
      </div>

      <LetterPreview
        title="Formal Complaint to Rent Control Department"
        letter={letter}
        letterType="complaint"
      />
    </div>
  )
}
