import { useState } from 'react'
import { useRent } from '../../context/RentContext'
import ComplaintPDF from './ComplaintPDF'

export default function EscalationPortal() {
  const { rentData, updateRentData } = useRent()
  const [showComplaint, setShowComplaint] = useState(rentData.landlordRejected)

  function handleEscalate() {
    updateRentData({ landlordRejected: true })
    setShowComplaint(true)
  }

  return (
    <div className="space-y-6">
      {!showComplaint ? (
        <div className="card">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-red-100 text-red-600 rounded-xl w-10 h-10 flex items-center justify-center text-xl shrink-0">
              🏛
            </div>
            <div>
              <h3 className="font-black text-[#064e3b] uppercase tracking-wide">
                Has your landlord rejected the negotiation letter?
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                If your landlord has refused a fair rent or has not responded within 14 days,
                you have the right under Act 220 to escalate to the Rent Control Department,
                Greater Accra Region.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button onClick={handleEscalate} className="btn-danger">
              Yes — Generate Formal Complaint
            </button>
            <button onClick={() => setShowComplaint(false)} className="btn-secondary">
              No — Still Negotiating
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card border-l-4 border-[#fbbf24] bg-amber-50">
            <p className="text-sm text-amber-900 leading-relaxed">
              <span className="font-black uppercase">Next step:</span> Print the complaint below,
              attach copies of your negotiation letter and rent receipts, and submit in person
              to the Rent Control Department, Greater Accra Region. Request a stamped receipt.
              You can also <strong>email it directly</strong> using the Email button.
            </p>
          </div>
          <ComplaintPDF />
        </>
      )}
    </div>
  )
}
