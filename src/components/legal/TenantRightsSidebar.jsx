import { MAX_ADVANCE_MONTHS } from '../../data/marketRates'

const ITEMS = [
  { term: 'Max Advance Rent',  def: `${MAX_ADVANCE_MONTHS} months only` },
  { term: 'Notice Required',   def: 'Written notice before any increase' },
  { term: 'Dispute Authority', def: 'Rent Control Dept, Greater Accra' },
  { term: 'Governing Law',     def: 'Act 220 — Ghana Rent Act, 1963' },
  { term: 'Eviction',          def: 'Court order required — self-help is illegal' },
]

export default function TenantRightsSidebar() {
  return (
    <div className="card border-l-4 border-[#064e3b] h-fit">
      <h4 className="font-black text-[#064e3b] mb-4 text-xs uppercase tracking-widest">
        Quick Reference
      </h4>
      <dl className="space-y-3.5">
        {ITEMS.map(({ term, def }) => (
          <div key={term}>
            <dt className="text-xs font-black text-gray-400 uppercase tracking-wide">{term}</dt>
            <dd className="text-sm text-gray-800 font-semibold mt-0.5">{def}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
