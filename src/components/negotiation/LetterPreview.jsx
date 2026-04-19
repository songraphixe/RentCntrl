import { useRent } from '../../context/RentContext'
import { supabase } from '../../lib/supabaseClient'

export default function LetterPreview({ title, letter, letterType = 'negotiation' }) {
  const { rentData } = useRent()

  async function handlePrint() {
    try {
      if (rentData.currentRecordId) {
        await supabase.from('letters_sent').insert({
          rent_record_id: rentData.currentRecordId,
          letter_type:    letterType,
          letter_body:    letter,
          sent_at:        new Date().toISOString(),
        })
      }
    } catch {
      // Non-critical — proceed to print regardless
    }
    window.print()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button onClick={handlePrint} className="btn-primary flex items-center gap-2 shrink-0">
          🖨 Print / Save as PDF
        </button>
      </div>

      <div className="printable-zone card bg-white overflow-x-auto">
        <pre className="whitespace-pre-wrap font-serif text-sm text-gray-900 leading-relaxed min-w-0">
          {letter}
        </pre>
      </div>
    </div>
  )
}
