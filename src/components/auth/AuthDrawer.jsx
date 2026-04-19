import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AuthDrawer({ open, onClose }) {
  const { signIn, signUp } = useAuth()
  const [tab, setTab]           = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [success, setSuccess]   = useState(null)

  function switchTab(t) {
    setTab(t)
    setError(null)
    setSuccess(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      if (tab === 'login') {
        await signIn(email, password)
        onClose()
      } else {
        await signUp(email, password)
        setSuccess('Account created! Check your email to confirm, then log in.')
        switchTab('login')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col auth-drawer">
        <div className="kente-stripe" />

        {/* Header */}
        <div className="bg-[#064e3b] px-6 py-8 text-center relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-white/50 hover:text-white text-2xl leading-none transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <span className="text-4xl block mb-2">⚖️</span>
          <div className="text-[#fbbf24] font-black text-xl tracking-tight uppercase">
            FairRent <span className="text-white">Ghana</span>
          </div>
          <div className="text-white/50 text-xs mt-1 uppercase tracking-widest">Know Your Rights</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
          {['login', 'signup'].map(t => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-2.5 text-xs font-black rounded-lg uppercase tracking-wide transition-all ${
                tab === t
                  ? 'bg-[#064e3b] text-[#fbbf24] shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {t === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5 overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              {success}
            </div>
          )}

          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="form-input"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            />
            {tab === 'signup' && (
              <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center"
          >
            {loading ? 'Please wait…' : tab === 'login' ? 'Log In →' : 'Create Account →'}
          </button>

          <p className="text-center text-sm text-gray-500">
            {tab === 'login' ? (
              <>No account?{' '}
                <button type="button" onClick={() => switchTab('signup')} className="text-[#064e3b] font-bold hover:underline">
                  Sign up free
                </button>
              </>
            ) : (
              <>Have an account?{' '}
                <button type="button" onClick={() => switchTab('login')} className="text-[#064e3b] font-bold hover:underline">
                  Log in
                </button>
              </>
            )}
          </p>
        </form>

        <div className="p-4 text-center text-xs text-gray-400 border-t border-gray-100 flex-shrink-0">
          Your data is protected under Ghanaian privacy law
        </div>
      </div>
    </>
  )
}
