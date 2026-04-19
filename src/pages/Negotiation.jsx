import { useNavigate } from 'react-router-dom'
import { useRent } from '../context/RentContext'
import NegotiationLetter from '../components/negotiation/NegotiationLetter'
import WizardProgress from '../components/shared/WizardProgress'

export default function Negotiation() {
  const { rentData } = useRent()
  const navigate     = useNavigate()

  if (!rentData.percentageIncrease) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center py-14">
          <span className="text-5xl mb-4 block">✉️</span>
          <p className="text-gray-500 mb-6 text-sm">Please complete the rent form first.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go to Dashboard →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      <div>
        <h1 className="section-title">Negotiation Letter</h1>
        <p className="section-subtitle">
          A formal, respectful letter to your landlord citing the Ghana Rent Act (Act 220).
        </p>
      </div>

      <WizardProgress current={2} />

      <div className="card border-l-4 border-[#fbbf24] bg-amber-50 no-print">
        <p className="text-amber-900 text-sm leading-relaxed">
          <strong>Instructions:</strong> Edit the letter if needed, then{' '}
          <strong>email it directly</strong> or print and deliver to your landlord in person or
          by registered post. Keep a signed copy. If there is no satisfactory response within
          14 days, use the <em>Escalate</em> page to file with the Rent Control Department.
        </p>
      </div>

      <NegotiationLetter />

      <div className="flex flex-col sm:flex-row gap-3 no-print">
        <button onClick={() => navigate('/legal')} className="btn-secondary">
          ← Back to Legal Check
        </button>
        <button onClick={() => navigate('/escalation')} className="btn-danger sm:ml-auto">
          Landlord Rejected? → Escalate
        </button>
        <button onClick={() => navigate('/lease')} className="btn-primary">
          Generate Lease Agreement →
        </button>
      </div>
    </div>
  )
}
