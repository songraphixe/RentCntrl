import { useNavigate } from 'react-router-dom'
import { useRent } from '../context/RentContext'
import EscalationPortal from '../components/escalation/EscalationPortal'

export default function Escalation() {
  const { rentData } = useRent()
  const navigate     = useNavigate()

  if (!rentData.percentageIncrease) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center py-14">
          <p className="text-gray-500 mb-5">Please complete the rent form first.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go to Dashboard</button>
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

      {/* Wizard progress */}
      <div className="flex items-center gap-2 text-xs text-gray-500 no-print">
        <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">1. Data ✓</span>
        <span className="text-gray-300">→</span>
        <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">2. Legal ✓</span>
        <span className="text-gray-300">→</span>
        <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">3. Negotiate ✓</span>
        <span className="text-gray-300">→</span>
        <span className="bg-green-700 text-white font-semibold px-2 py-0.5 rounded">4. Escalate</span>
        <span className="text-gray-300">→</span>
        <span className="text-gray-400 px-2 py-0.5">5. Lease</span>
      </div>

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
