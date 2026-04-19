import { useNavigate } from 'react-router-dom'
import { useRent } from '../context/RentContext'
import EscalationPortal from '../components/escalation/EscalationPortal'
import WizardProgress from '../components/shared/WizardProgress'

export default function Escalation() {
  const { rentData } = useRent()
  const navigate     = useNavigate()

  if (!rentData.percentageIncrease) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center py-14">
          <span className="text-5xl mb-4 block">🏛</span>
          <p className="text-gray-500 mb-6 text-sm">Please complete the rent form first.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go to Dashboard →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      <div>
        <h1 className="section-title">Escalate to Rent Control</h1>
        <p className="section-subtitle">
          Generate a formal complaint to the Rent Control Department, Greater Accra Region.
        </p>
      </div>

      <WizardProgress current={3} />

      <EscalationPortal />

      <div className="flex flex-col sm:flex-row gap-3 no-print">
        <button onClick={() => navigate('/negotiation')} className="btn-secondary">
          ← Back to Negotiation
        </button>
        <button onClick={() => navigate('/lease')} className="btn-primary sm:ml-auto">
          Generate Lease Agreement →
        </button>
      </div>
    </div>
  )
}
