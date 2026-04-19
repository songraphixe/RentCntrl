import RentInputForm from '../components/dashboard/RentInputForm'
import RentCalculator from '../components/dashboard/RentCalculator'

const STEPS = [
  { icon: '📝', step: '1', title: 'Enter Rent Data',    desc: 'Fill in your current and proposed rent' },
  { icon: '⚖️', step: '2', title: 'Check Legal Status', desc: 'See if the increase violates Act 220' },
  { icon: '✉️', step: '3', title: 'Generate Letter',    desc: 'Print a formal negotiation letter' },
  { icon: '🏛',  step: '4', title: 'Escalate if Needed', desc: 'File with Rent Control Dept' },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl" aria-hidden>⚖️</span>
          <h1 className="text-3xl font-bold tracking-tight">FairRent Ghana</h1>
        </div>
        <p className="text-green-100 text-lg leading-relaxed max-w-xl">
          Know your rights as a tenant in <strong className="text-yellow-300">Tema Community 23</strong>.
          Track rent increases, generate legal documents, and escalate unfair hikes —
          all protected by the Ghana Rent Act (Act 220).
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          <span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
            Act 220 Protected
          </span>
          <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Tema Community 23
          </span>
          <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Free Legal Templates
          </span>
          <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            No AI — 100% Private
          </span>
        </div>
      </div>

      {/* How it works */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">How it works</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STEPS.map(s => (
            <div key={s.step} className="card text-center hover:shadow-md transition-shadow">
              <span className="text-2xl block mb-1" aria-hidden>{s.icon}</span>
              <p className="text-xs font-bold text-green-700 mb-0.5">Step {s.step}</p>
              <p className="text-sm font-semibold text-gray-800">{s.title}</p>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Enter Your Rent Details</h2>
        <p className="text-sm text-gray-500 mb-6">
          All information is stored securely and used only to generate your legal documents.
        </p>
        <RentInputForm />
      </div>

      {/* Live calculation preview */}
      <RentCalculator />
    </div>
  )
}
