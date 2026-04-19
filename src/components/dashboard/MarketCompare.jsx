import { useRent } from '../../context/RentContext'
import { MARKET_BASELINES } from '../../data/marketRates'
import { formatGHS } from '../../lib/rentCalculations'

function Bar({ label, value, maxValue, colorClass, sublabel }) {
  const pct = Math.min((value / maxValue) * 100, 100)
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">{sublabel}</span>
      </div>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function MarketCompare() {
  const { rentData } = useRent()

  const baseline = rentData.roomType ? MARKET_BASELINES[rentData.roomType] : null
  const current  = parseFloat(rentData.previousRent) || 0
  const proposed = parseFloat(rentData.proposedRent) || 0

  if (!baseline || !current) return null

  const maxVal = Math.max(baseline, current, proposed) * 1.05

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-700 mb-1">Market Rate Comparison</h3>
      <p className="text-sm text-gray-500 mb-5">
        {rentData.neighborhood} — {rentData.roomType}
      </p>

      <div className="space-y-4">
        <Bar
          label="Community Baseline"
          value={baseline}
          maxValue={maxVal}
          colorClass="bg-green-500"
          sublabel={`${formatGHS(baseline)}/mo`}
        />
        <Bar
          label="Your Current Rent"
          value={current}
          maxValue={maxVal}
          colorClass="bg-blue-500"
          sublabel={`${formatGHS(current)}/mo`}
        />
        {proposed > 0 && (
          <Bar
            label="Proposed New Rent"
            value={proposed}
            maxValue={maxVal}
            colorClass="bg-red-500"
            sublabel={`${formatGHS(proposed)}/mo`}
          />
        )}
      </div>

      {current > baseline * 1.2 && (
        <p className="mt-4 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
          Your current rent is already above the community average.
          The proposed increase may be particularly difficult to justify.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />Baseline
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />Proposed
        </span>
      </div>
    </div>
  )
}
