import { MAX_ADVANCE_MONTHS } from '../../data/marketRates'

export default function TenantRightsSidebar() {
  const items = [
    { term: 'Max Advance Rent',  def: `${MAX_ADVANCE_MONTHS} months only` },
    { term: 'Notice Required',   def: 'Written notice before any increase' },
    { term: 'Dispute Authority', def: 'Rent Control Dept, Greater Accra' },
    { term: 'Governing Law',     def: 'Act 220 — Ghana Rent Act, 1963' },
    { term: 'Eviction',         def: 'Court order required — self-help is illegal' },
  ]

  return (
    <div className="card border-l-4 border-green-600 h-fit">
      <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
        Quick Reference
      </h4>
      <dl className="space-y-3">
        {items.map(({ term, def }) => (
          <div key={term}>
            <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{term}</dt>
            <dd className="text-sm text-gray-800 mt-0.5">{def}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
