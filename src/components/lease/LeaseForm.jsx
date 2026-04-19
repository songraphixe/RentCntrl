import { useRent } from '../../context/RentContext'
import { getCompromiseRate } from '../../lib/rentCalculations'

export default function LeaseForm() {
  const { rentData, updateRentData } = useRent()

  const suggestedRent = rentData.previousRent ? getCompromiseRate(rentData.previousRent) : ''

  function setField(key, value) {
    updateRentData({ [key]: value })
  }

  return (
    <div className="card space-y-5">
      <h3 className="font-black text-[#064e3b] uppercase tracking-wide text-sm">
        Lease Agreement Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Tenant Full Name</label>
          <input
            className="form-input"
            value={rentData.tenantName}
            onChange={e => setField('tenantName', e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Landlord Full Name</label>
          <input
            className="form-input"
            value={rentData.landlordName}
            onChange={e => setField('landlordName', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="form-label">Property Address</label>
        <input
          className="form-input"
          value={rentData.address}
          onChange={e => setField('address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">
            Agreed Monthly Rent (GHS)
            {suggestedRent && (
              <span className="text-[#064e3b]/60 font-normal normal-case tracking-normal ml-1">
                — suggested: GHS {suggestedRent.toLocaleString()}
              </span>
            )}
          </label>
          <input
            type="number" min="1" step="0.01"
            className="form-input"
            value={rentData.agreedRent}
            placeholder={suggestedRent ? String(suggestedRent) : 'Enter agreed rent'}
            onChange={e => setField('agreedRent', e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Lease Start Date</label>
          <input
            type="date"
            className="form-input"
            value={rentData.leaseStart}
            onChange={e => setField('leaseStart', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="form-label">Lease Duration</label>
        <select
          className="form-select"
          value={rentData.leaseDuration}
          onChange={e => setField('leaseDuration', e.target.value)}
        >
          <option value="12">12 months (1 year)</option>
          <option value="24">24 months (2 years)</option>
        </select>
      </div>

      <div>
        <label className="form-label">Renewal Terms</label>
        <textarea
          rows={3}
          className="form-input resize-none"
          value={rentData.renewalTerms}
          onChange={e => setField('renewalTerms', e.target.value)}
        />
      </div>
    </div>
  )
}
