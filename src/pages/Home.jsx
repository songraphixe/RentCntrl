import { useAuth } from '../context/AuthContext'
import RentInputForm from '../components/dashboard/RentInputForm'
import RentCalculator from '../components/dashboard/RentCalculator'

const STEPS = [
  { icon: '📝', step: '1', title: 'Enter Data',   desc: 'Fill your current and proposed rent' },
  { icon: '⚖️', step: '2', title: 'Check Legal',  desc: 'See if the increase violates Act 220' },
  { icon: '✉️', step: '3', title: 'Negotiate',    desc: 'Edit & email a formal letter' },
  { icon: '🏛',  step: '4', title: 'Escalate',    desc: 'File with Rent Control Dept' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Hero */}
      <div className="bg-[#064e3b] text-white rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#fbbf24]/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
        <div className="kente-stripe rounded-full mb-5 w-24" style={{ height: '3px' }} />

        <div className="flex items-start gap-4 mb-4 relative">
          <span className="text-5xl" aria-hidden>⚖️</span>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase leading-tight">
              FairRent <span className="text-[#fbbf24]">Ghana</span>
            </h1>
            <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">Know Your Rights</p>
          </div>
        </div>

        <p className="text-white/80 text-base leading-relaxed max-w-xl relative">
          Protecting tenants in{' '}
          <strong className="text-[#fbbf24]">Tema Community 23</strong> against unlawful rent
          increases. Track hikes, generate legal documents, and escalate — all covered by the{' '}
          <strong className="text-white">Ghana Rent Act (Act 220)</strong>.
        </p>

        <div className="flex flex-wrap gap-2 mt-5 relative">
          <span className="bg-[#fbbf24] text-[#064e3b] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
            Act 220 Protected
          </span>
          <span className="bg-white/10 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
            Tema Comm. 23
          </span>
          <span className="bg-white/10 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
            Free Legal Templates
          </span>
          <span className="bg-white/10 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
            100% Private
          </span>
        </div>
      </div>

      {/* Auth nudge */}
      {!user && (
        <div className="flex items-center gap-3 bg-white border-l-4 border-[#fbbf24] rounded-xl px-4 py-3 shadow-sm">
          <span className="text-xl shrink-0">🔐</span>
          <p className="text-sm text-gray-700">
            <strong className="text-[#064e3b]">Save your progress</strong> — create a free
            account to store your rent records securely.
          </p>
        </div>
      )}

      {/* How it works */}
      <div>
        <h2 className="text-xs font-black text-[#064e3b] uppercase tracking-widest mb-3">
          How It Works
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STEPS.map(s => (
            <div key={s.step} className="card card-hover text-center">
              <span className="text-2xl block mb-2" aria-hidden>{s.icon}</span>
              <p className="text-xs font-black text-[#fbbf24] bg-[#064e3b] inline-block px-2 py-0.5 rounded mb-1.5 uppercase tracking-wide">
                Step {s.step}
              </p>
              <p className="text-sm font-black text-[#064e3b] uppercase tracking-tight leading-tight">{s.title}</p>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Input form */}
      <div className="card">
        <h2 className="text-lg font-black text-[#064e3b] uppercase tracking-tight mb-1">
          Enter Your Rent Details
        </h2>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-6">
          Used only to generate your legal documents
        </p>
        <RentInputForm />
      </div>

      <RentCalculator />
    </div>
  )
}
