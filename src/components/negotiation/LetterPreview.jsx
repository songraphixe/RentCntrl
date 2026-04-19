import { useState, useRef, useEffect } from 'react'
import { useRent } from '../../context/RentContext'
import { supabase } from '../../lib/supabaseClient'

export default function LetterPreview({ title, letter, letterType = 'negotiation' }) {
  const { rentData }                          = useRent()
  const [editMode, setEditMode]               = useState(false)
  const [editedLetter, setEditedLetter]       = useState(letter)
  const [emailOpen, setEmailOpen]             = useState(false)
  const [recipientEmail, setRecipientEmail]   = useState('')
  const emailInputRef                         = useRef(null)

  // Sync when letter prop changes (e.g. rent data updated)
  useEffect(() => { setEditedLetter(letter) }, [letter])

  async function handlePrint() {
    try {
      if (supabase && rentData.currentRecordId) {
        await supabase.from('letters_sent').insert({
          rent_record_id: rentData.currentRecordId,
          letter_type:    letterType,
          letter_body:    editedLetter,
          sent_at:        new Date().toISOString(),
        })
      }
    } catch { /* non-critical */ }
    window.print()
  }

  function openEmail() {
    setEmailOpen(true)
    setTimeout(() => emailInputRef.current?.focus(), 80)
  }

  function sendEmail() {
    const subject = encodeURIComponent(
      letterType === 'negotiation'
        ? `Formal Objection to Proposed Rent Increase — ${rentData.address}`
        : `Formal Complaint — Rent Control Department — ${rentData.address}`
    )
    const body = encodeURIComponent(editedLetter)
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
    setEmailOpen(false)
  }

  return (
    <div className="space-y-4">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
        <h3 className="font-black text-[#064e3b] uppercase tracking-wide text-sm">{title}</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setEditMode(e => !e); setEmailOpen(false) }}
            className={`text-xs font-black uppercase tracking-wide px-3 py-2 rounded-lg border-2 transition-all ${
              editMode
                ? 'bg-[#064e3b] text-[#fbbf24] border-[#064e3b]'
                : 'border-gray-200 text-gray-600 hover:border-[#064e3b] hover:text-[#064e3b]'
            }`}
          >
            {editMode ? '✓ Done' : '✏️ Edit'}
          </button>
          <button
            onClick={openEmail}
            className="text-xs font-black uppercase tracking-wide px-3 py-2 rounded-lg bg-[#064e3b] text-[#fbbf24] hover:bg-[#065f46] transition-all hover:-translate-y-0.5"
          >
            📧 Email
          </button>
          <button
            onClick={handlePrint}
            className="text-xs font-black uppercase tracking-wide px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-600 hover:border-[#064e3b] hover:text-[#064e3b] transition-all"
          >
            🖨 Print
          </button>
        </div>
      </div>

      {/* Letter body */}
      <div className="printable-zone">
        {editMode ? (
          <div className="card bg-amber-50 border-2 border-[#fbbf24]">
            <p className="text-xs font-black text-amber-800 uppercase tracking-wide mb-3 no-print">
              ✏️ Edit mode — changes apply to Email & Print
            </p>
            <textarea
              value={editedLetter}
              onChange={e => setEditedLetter(e.target.value)}
              className="w-full font-mono text-sm text-gray-900 leading-relaxed bg-transparent border-none outline-none resize-none min-h-[520px]"
              spellCheck={false}
            />
          </div>
        ) : (
          <div className="card bg-white overflow-x-auto">
            <pre className="whitespace-pre-wrap font-serif text-sm text-gray-900 leading-relaxed min-w-0">
              {editedLetter}
            </pre>
          </div>
        )}
      </div>

      {/* Email bar — slides up from bottom */}
      {emailOpen && (
        <div className="email-bar-enter fixed bottom-0 left-0 right-0 bg-[#064e3b] px-4 py-4 shadow-2xl z-50 no-print border-t-4 border-[#fbbf24]">
          <div className="max-w-2xl mx-auto flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-black text-white/60 uppercase tracking-wide mb-1.5">
                Recipient Email
              </label>
              <input
                ref={emailInputRef}
                type="email"
                value={recipientEmail}
                onChange={e => setRecipientEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && recipientEmail && sendEmail()}
                placeholder={
                  letterType === 'negotiation'
                    ? 'landlord@email.com'
                    : 'rentcontrol@ghana.gov.gh'
                }
                className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-3 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#fbbf24] transition-colors"
              />
            </div>
            <button
              onClick={sendEmail}
              disabled={!recipientEmail}
              className="bg-[#fbbf24] text-[#064e3b] font-black text-xs uppercase tracking-wide px-5 py-2.5 rounded-lg hover:bg-[#f59e0b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              Send →
            </button>
            <button
              onClick={() => setEmailOpen(false)}
              className="text-white/50 hover:text-white text-2xl leading-none shrink-0 pb-0.5"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
