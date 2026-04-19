import { useRent } from '../../context/RentContext'
import { generateNegotiationLetter } from '../../templates/negotiationLetter'
import LetterPreview from './LetterPreview'

export default function NegotiationLetter() {
  const { rentData } = useRent()
  const pct = rentData.percentageIncrease

  if (!pct || pct <= 10) {
    return (
      <div className="card text-center py-10">
        <span className="text-4xl mb-3 block">✓</span>
        <p className="font-semibold text-gray-700 text-lg mb-1">No Letter Needed</p>
        <p className="text-sm text-gray-500">
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
