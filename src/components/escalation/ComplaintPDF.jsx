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
      <div className="border-l-4 border-red-500 bg-red-50 rounded-r-xl p-4 no-print">
        <p className="font-semibold text-red-800">Formal Complaint — Rent Control Department</p>
        <p className="text-sm text-red-700 mt-1">
          Print or save this document and submit it in person to the Rent Control Department,
          Greater Accra Region. Bring your ID and any supporting documents.
        </p>
      </div>

      <LetterPreview
        title="Formal Complaint to Rent Control Department"
        letter={letter}
        letterType="complaint"
      />
    </div>
  )
}
