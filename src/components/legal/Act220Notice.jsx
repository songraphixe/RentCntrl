import { ACT_220_POINTS } from '../../data/marketRates'

export default function Act220Notice() {
  return (
    <div className="card border-l-4 border-[#fbbf24]">
      <div className="flex items-start gap-3 mb-5">
        <div className="bg-[#064e3b] text-[#fbbf24] rounded-xl w-10 h-10 flex items-center justify-center text-xl shrink-0">
          ⚖️
        </div>
        <div>
          <h3 className="font-black text-[#064e3b] uppercase tracking-wide">
            Ghana Rent Act, 1963 — Act 220
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">
            Your statutory protections as a tenant in Ghana
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {ACT_220_POINTS.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="text-[#fbbf24] font-black shrink-0 bg-[#064e3b] w-5 h-5 rounded flex items-center justify-center text-xs mt-0.5">
              ✓
            </span>
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-start gap-3 p-4 bg-[#064e3b]/5 rounded-xl border border-[#064e3b]/10">
        <span className="text-lg shrink-0">📞</span>
        <p className="text-xs text-[#064e3b] leading-relaxed">
          <strong>Rent Control Department — Greater Accra Region.</strong>{' '}
          Contact them if your rights are being violated. Bring all written correspondence
          and payment receipts.
        </p>
      </div>
    </div>
  )
}
