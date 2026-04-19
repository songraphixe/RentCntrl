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
          <h3 className="font-semibold text-gray-900 text-lg mb-2">
            Has your landlord rejected the negotiation letter?
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            If your landlord has refused to accept a fair rent or has not responded within
            14 days, you have the right under Act 220 to escalate this matter to the Rent
            Control Department, Greater Accra Region.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleEscalate} className="btn-danger">
              Yes — Generate Formal Complaint
            </button>
            <button
              onClick={() => setShowComplaint(false)}
              className="btn-secondary"
            >
              No — Still Negotiating
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Next step:</span> Print the complaint below,
              attach copies of your negotiation letter and rent receipts, and submit in person
              to the Rent Control Department, Greater Accra Region. Request a stamped receipt.
            </p>
          </div>
          <ComplaintPDF />
        </>
      )}
    </div>
  )
}
