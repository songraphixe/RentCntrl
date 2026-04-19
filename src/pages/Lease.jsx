import { useNavigate } from 'react-router-dom'
import LeaseForm from '../components/lease/LeaseForm'
import LeasePreview from '../components/lease/LeasePreview'

export default function Lease() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      <div>
        <h1 className="section-title">Digital Lease Agreement</h1>
        <p className="section-subtitle">
          Generate a standard residential lease that locks in your negotiated rent rate.
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
        <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">4. Escalate ✓</span>
        <span className="text-gray-300">→</span>
        <span className="bg-green-700 text-white font-semibold px-2 py-0.5 rounded">5. Lease</span>
      </div>

      <div className="card bg-green-50 border border-green-200 no-print">
        <p className="text-green-800 text-sm leading-relaxed">
          <strong>Instructions:</strong> Complete the form, then print <strong>two copies</strong> —
          one for you and one for your landlord. Both parties must sign and retain a copy.
          This agreement is governed by Ghanaian law and the Ghana Rent Act (Act 220).
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
