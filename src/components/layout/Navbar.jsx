import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthDrawer from '../auth/AuthDrawer'

const NAV_LINKS = [
  { to: '/',            label: 'Dashboard' },
  { to: '/legal',       label: 'Legal' },
  { to: '/negotiation', label: 'Negotiate' },
  { to: '/escalation',  label: 'Escalate' },
  { to: '/lease',       label: 'Lease' },
]

export default function Navbar() {
  const { pathname }          = useLocation()
  const { user, signOut }     = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <nav className="bg-[#064e3b] text-white shadow-lg no-print sticky top-0 z-30">
        <div className="kente-stripe" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2 font-black text-base shrink-0 hover:opacity-90 transition-opacity">
              <span className="text-[#fbbf24] text-xl" aria-hidden>⚖</span>
              <span className="uppercase tracking-tight">
                FairRent <span className="text-[#fbbf24]">GH</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-wide transition-all duration-150 ${
                    pathname === to
                      ? 'bg-[#fbbf24] text-[#064e3b]'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Auth controls */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-white/50 text-xs truncate max-w-[140px]">{user.email}</span>
                  <button
                    onClick={signOut}
                    className="text-xs font-black uppercase tracking-wide text-[#fbbf24] border border-[#fbbf24]/40 px-2.5 py-1.5 rounded-md hover:bg-[#fbbf24]/10 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hidden md:block text-xs font-black uppercase tracking-wide bg-[#fbbf24] text-[#064e3b] px-3 py-1.5 rounded-md hover:bg-[#f59e0b] transition-colors"
                >
                  Login / Sign Up
                </button>
              )}

              {/* Hamburger */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none transition-colors"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <div className="w-5 space-y-1.5">
                  <span className={`block h-0.5 bg-white rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 bg-white rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 bg-white rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 pb-4 pt-2 space-y-1 bg-[#064e3b]">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-black uppercase tracking-wide transition-colors ${
                  pathname === to
                    ? 'bg-[#fbbf24] text-[#064e3b]'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 mt-2">
              {user ? (
                <>
                  <p className="text-white/40 text-xs px-3 py-1 truncate">{user.email}</p>
                  <button
                    onClick={() => { signOut(); setMenuOpen(false) }}
                    className="block w-full text-left px-3 py-2.5 text-sm font-black uppercase text-[#fbbf24] hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setAuthOpen(true); setMenuOpen(false) }}
                  className="w-full bg-[#fbbf24] text-[#064e3b] text-sm font-black uppercase tracking-wide py-2.5 rounded-lg hover:bg-[#f59e0b] transition-colors"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
