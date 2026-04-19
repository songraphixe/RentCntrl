import { useRent } from '../../context/RentContext'
import { generateNegotiationLetter } from '../../templates/negotiationLetter'
import LetterPreview from './LetterPreview'

export default function NegotiationLetter() {
  const { rentData } = useRent()
  const pct = rentData.percentageIncrease

  if (!pct || pct <= 10) {
    return (
      <div className="card text-center py-12">
        <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center text-3xl mx-auto mb-4">
          ✓
        </div>
        <p className="font-black text-[#064e3b] text-lg uppercase tracking-wide mb-1">
          No Letter Needed
        </p>
        <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
          Your proposed increase is within the acceptable 10% threshold.
          Consider generating a lease agreement to lock in the new rate.
        </p>
      </div>
    )
  }

  const letter = generateNegotiationLetter({
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
    <LetterPreview
      title="Negotiation Letter to Landlord"
      letter={letter}
      letterType="negotiation"
    />
  )
}
