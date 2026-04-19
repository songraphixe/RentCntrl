export function calcPercentageIncrease(previousRent, proposedRent) {
  const prev = parseFloat(previousRent)
  const next = parseFloat(proposedRent)
  if (!prev || !next || prev <= 0) return null
  return ((next - prev) / prev) * 100
}

export function formatGHS(amount) {
  const n = parseFloat(amount)
  if (isNaN(n)) return 'GHS 0.00'
  return `GHS ${n.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function getSeverity(pct) {
  if (pct === null || pct === undefined) return null
  if (pct <= 10) return 'low'
  if (pct <= 25) return 'moderate'
  return 'high'
}

export function getCompromiseRate(previousRent) {
  return Math.round(parseFloat(previousRent) * 1.1)
}

export function formatDate(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
