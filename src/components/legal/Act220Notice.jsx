import { ACT_220_POINTS } from '../../data/marketRates'

export default function Act220Notice() {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 rounded-r-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl" aria-hidden>⚖️</span>
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            Ghana Rent Act, 1963 — Act 220
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">
            Your statutory protections as a tenant in Ghana
          </p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {ACT_220_POINTS.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-yellow-600 font-bold mt-0.5 shrink-0">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-start gap-2 p-3 bg-yellow-100 rounded-lg">
        <span className="text-yellow-700 shrink-0">📞</span>
        <p className="text-xs text-yellow-800">
          <strong>Rent Control Department — Greater Accra Region.</strong>{' '}
          Contact them if your rights are being violated. Bring all written correspondence
          and payment receipts.
        </p>
      </div>
    </div>
  )
}
