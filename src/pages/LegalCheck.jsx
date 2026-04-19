import { useNavigate } from 'react-router-dom'
import { useRent } from '../context/RentContext'
import Act220Notice from '../components/legal/Act220Notice'
import TenantRightsSidebar from '../components/legal/TenantRightsSidebar'
import MarketCompare from '../components/dashboard/MarketCompare'
import RentCalculator from '../components/dashboard/RentCalculator'
import WizardProgress from '../components/shared/WizardProgress'

export default function LegalCheck() {
  const { rentData } = useRent()
  const navigate     = useNavigate()
  const pct          = rentData.percentageIncrease

  if (pct === null || pct === undefined) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center py-14">
          <span className="text-5xl mb-4 block">📋</span>
          <p className="text-gray-500 mb-6 text-sm">No rent data found. Start by entering your details.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Dashboard →
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

      <WizardProgress current={1} />

      <RentCalculator />
      <MarketCompare />
      <Act220Notice />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {isExcessive ? (
            <div className="card border-l-4 border-red-500 bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚨</span>
                <h3 className="font-black text-red-800 uppercase tracking-wide">Action Required</h3>
              </div>
              <p className="text-red-700 text-sm mb-5 leading-relaxed">
                A <strong>{pct.toFixed(1)}%</strong> increase exceeds the 10% threshold and may be
                unlawful under Act 220. Generate a formal negotiation letter to your landlord as the
                first step.
              </p>
              <button onClick={() => navigate('/negotiation')} className="btn-danger">
                Generate Negotiation Letter →
              </button>
            </div>
          ) : (
            <div className="card border-l-4 border-green-500 bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✅</span>
                <h3 className="font-black text-green-800 uppercase tracking-wide">Increase Appears Reasonable</h3>
              </div>
              <p className="text-green-700 text-sm mb-5 leading-relaxed">
                A <strong>{pct.toFixed(1)}%</strong> increase is within the acceptable 10% range.
                Consider formalising the new rate with a signed lease agreement to protect both parties.
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
