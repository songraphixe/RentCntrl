import { useNavigate } from 'react-router-dom'
import { useRent } from '../context/RentContext'
import Act220Notice from '../components/legal/Act220Notice'
import TenantRightsSidebar from '../components/legal/TenantRightsSidebar'
import MarketCompare from '../components/dashboard/MarketCompare'
import RentCalculator from '../components/dashboard/RentCalculator'

export default function LegalCheck() {
  const { rentData } = useRent()
  const navigate     = useNavigate()
  const pct          = rentData.percentageIncrease

  if (pct === null || pct === undefined) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center py-14">
          <span className="text-4xl mb-3 block">📋</span>
          <p className="text-gray-500 mb-5">No rent data found. Please start by entering your details.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const isExcessive = pct > 10

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

      <div>
        <h1 className="section-title">Legal Check</h1>
        <p className="section-subtitle">
          Reviewing your rent increase against Act 220 and Tema Community 23 market rates.
        </p>
      </div>

      {/* Wizard progress */}
      <div className="flex items-center gap-2 text-xs text-gray-500 no-print">
        <span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">1. Data ✓</span>
        <span className="text-gray-300">→</span>
        <span className="bg-green-700 text-white font-semibold px-2 py-0.5 rounded">2. Legal Check</span>
        <span className="text-gray-300">→</span>
        <span className="text-gray-400 px-2 py-0.5">3. Negotiate</span>
        <span className="text-gray-300">→</span>
        <span className="text-gray-400 px-2 py-0.5">4. Escalate</span>
        <span className="text-gray-300">→</span>
        <span className="text-gray-400 px-2 py-0.5">5. Lease</span>
      </div>

      <RentCalculator />
      <MarketCompare />
      <Act220Notice />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {isExcessive ? (
            <div className="card border border-red-200 bg-red-50">
              <h3 className="font-bold text-red-800 text-lg mb-2">Action Required</h3>
              <p className="text-red-700 text-sm mb-4">
                A {pct.toFixed(1)}% increase exceeds the 10% threshold and may be unlawful under Act 220.
                We recommend generating a formal negotiation letter to your landlord as the first step.
              </p>
              <button onClick={() => navigate('/negotiation')} className="btn-danger">
                Generate Negotiation Letter →
              </button>
            </div>
          ) : (
            <div className="card border border-green-200 bg-green-50">
              <h3 className="font-bold text-green-800 text-lg mb-2">Increase Appears Reasonable</h3>
              <p className="text-green-700 text-sm mb-4">
                A {pct.toFixed(1)}% increase is within the acceptable 10% range. You may still wish to
                formalise the new agreed rate with a signed lease agreement to protect both parties.
              </p>
              <button onClick={() => navigate('/lease')} className="btn-primary">
                Generate Lease Agreement →
              </button>
            </div>
          )}
        </div>
        <TenantRightsSidebar />
      </div>
    </div>
  )
}
