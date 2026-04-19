import { useRent } from '../../context/RentContext'
import { calcPercentageIncrease, formatGHS, getSeverity } from '../../lib/rentCalculations'

export default function RentCalculator() {
  const { rentData } = useRent()

  const prev = parseFloat(rentData.previousRent)
  const next = parseFloat(rentData.proposedRent)

  if (!prev || !next) return null

  const pct      = rentData.percentageIncrease ?? calcPercentageIncrease(prev, next)
  const severity = getSeverity(pct)
  const diff     = next - prev

  const badge = {
    low:      'badge-green',
    moderate: 'badge-amber',
    high:     'badge-red',
  }[severity]

  const label = {
    low:      '✓ Within Acceptable Range',
    moderate: '⚠ Potentially Excessive',
    high:     '✕ Likely Unlawful Increase',
  }[severity]

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-700 mb-4">Rent Increase Analysis</h3>

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Current Rent</p>
          <p className="font-bold text-gray-800 text-sm">{formatGHS(prev)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Proposed Rent</p>
          <p className="font-bold text-gray-800 text-sm">{formatGHS(next)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Monthly Increase</p>
          <p className="font-bold text-red-600 text-sm">+{formatGHS(diff)}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 rounded-xl p-4">
        <div>
          <p className="text-4xl font-bold text-gray-900">{pct?.toFixed(1)}%</p>
          <p className="text-sm text-gray-500 mt-0.5">Percentage Increase</p>
        </div>
        <span className={`${badge} text-sm px-4 py-2`}>{label}</span>
      </div>

      {severity !== 'low' && (
        <p className="mt-3 text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-2.5">
          An increase above 10% may violate the Ghana Rent Act (Act 220).
          View the Legal Check page to understand your rights and next steps.
        </p>
      )}
    </div>
  )
}
