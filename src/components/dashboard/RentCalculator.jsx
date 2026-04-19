import { useEffect, useRef, useState } from 'react'
import { useRent } from '../../context/RentContext'
import { calcPercentageIncrease, formatGHS, getSeverity } from '../../lib/rentCalculations'

function useCountUp(target, duration = 700) {
  const [display, setDisplay] = useState(0)
  const raf                   = useRef(null)

  useEffect(() => {
    if (target === null || target === undefined) return
    const start    = performance.now()
    const startVal = 0

    function tick(now) {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setDisplay(startVal + (target - startVal) * eased)
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return display
}

export default function RentCalculator() {
  const { rentData } = useRent()

  const prev = parseFloat(rentData.previousRent)
  const next = parseFloat(rentData.proposedRent)

  if (!prev || !next) return null

  const pct      = rentData.percentageIncrease ?? calcPercentageIncrease(prev, next)
  const severity = getSeverity(pct)
  const diff     = next - prev

  const animatedPct = useCountUp(pct)

  const badgeClass = { low: 'badge-green', moderate: 'badge-amber', high: 'badge-red' }[severity]
  const badgeLabel = {
    low:      '✓ Within Acceptable Range',
    moderate: '⚠ Potentially Excessive',
    high:     '✕ Likely Unlawful Increase',
  }[severity]

  return (
    <div className="card">
      <h3 className="font-black text-[#064e3b] uppercase tracking-wide text-sm mb-4">
        Rent Increase Analysis
      </h3>

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        {[
          { label: 'Current Rent',    value: formatGHS(prev), color: 'text-gray-800' },
          { label: 'Proposed Rent',   value: formatGHS(next), color: 'text-gray-800' },
          { label: 'Monthly Increase', value: `+${formatGHS(diff)}`, color: 'text-red-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
            <p className={`font-black text-sm ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#064e3b] rounded-xl p-5">
        <div className="text-center sm:text-left count-reveal">
          <p className="text-5xl font-black text-[#fbbf24] leading-none">
            {animatedPct.toFixed(1)}%
          </p>
          <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Percentage Increase</p>
        </div>
        <span className={`${badgeClass} text-sm px-4 py-2 ${severity === 'high' ? 'badge-pulse' : ''}`}>
          {badgeLabel}
        </span>
      </div>

      {severity !== 'low' && (
        <p className="mt-3 text-sm text-amber-800 bg-amber-50 rounded-xl px-4 py-3 border border-amber-200">
          An increase above 10% may violate the Ghana Rent Act (Act 220).
          View the Legal Check page to understand your rights and next steps.
        </p>
      )}
    </div>
  )
}
