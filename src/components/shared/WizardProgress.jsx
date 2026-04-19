const STEPS = ['Data', 'Legal', 'Negotiate', 'Escalate', 'Lease']

export default function WizardProgress({ current }) {
  return (
    <div className="flex items-center gap-1 no-print overflow-x-auto pb-1">
      {STEPS.map((label, i) => {
        const done    = i < current
        const active  = i === current
        return (
          <div key={label} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-300 text-xs">→</span>}
            <span className={`text-xs font-black uppercase tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
              done   ? 'bg-[#064e3b]/10 text-[#064e3b]' :
              active ? 'bg-[#064e3b] text-[#fbbf24]' :
                       'text-gray-400'
            }`}>
              {done ? `${label} ✓` : label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
