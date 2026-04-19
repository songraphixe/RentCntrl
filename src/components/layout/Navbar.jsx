import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',            label: 'Dashboard' },
  { to: '/legal',       label: 'Legal Check' },
  { to: '/negotiation', label: 'Negotiate' },
  { to: '/escalation',  label: 'Escalate' },
  { to: '/lease',       label: 'Lease' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-green-700 text-white shadow-lg no-print">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <span className="text-yellow-400 text-xl" aria-hidden>⚖</span>
            <span>FairRent <span className="text-yellow-400">Ghana</span></span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'bg-green-900 text-yellow-400'
                    : 'hover:bg-green-600 text-green-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-green-600 focus:outline-none"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-white transition-transform" />
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-green-600 px-4 pb-4 space-y-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-green-900 text-yellow-400'
                  : 'hover:bg-green-600 text-green-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
