import { useNavigate } from 'react-router-dom'
import LeaseForm from '../components/lease/LeaseForm'
import LeasePreview from '../components/lease/LeasePreview'
import WizardProgress from '../components/shared/WizardProgress'

export default function Lease() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      <div>
        <h1 className="section-title">Lease Agreement</h1>
        <p className="section-subtitle">
          Generate a standard residential lease that locks in your negotiated rent rate.
        </p>
      </div>

      <WizardProgress current={4} />

      <div className="card border-l-4 border-green-500 bg-green-50 no-print">
        <p className="text-green-800 text-sm leading-relaxed">
          <strong>Instructions:</strong> Complete the form below, then print{' '}
          <strong>two copies</strong> — one for you and one for your landlord. Both parties must
          sign and retain a copy. This agreement is governed by Ghanaian law and the Ghana Rent
          Act (Act 220).
        </p>
      </div>

      <LeaseForm />
      <LeasePreview />

      <div className="flex gap-3 no-print">
        <button onClick={() => navigate('/escalation')} className="btn-secondary">
          ← Back to Escalation
        </button>
      </div>
    </div>
  )
}
