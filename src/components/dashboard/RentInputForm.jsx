import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRent } from '../../context/RentContext'
import { calcPercentageIncrease } from '../../lib/rentCalculations'
import { ROOM_TYPES } from '../../data/marketRates'
import { supabase } from '../../lib/supabaseClient'

export default function RentInputForm() {
  const { rentData, updateRentData } = useRent()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  function validate() {
    const e = {}
    if (!rentData.tenantName.trim())   e.tenantName   = 'Required'
    if (!rentData.landlordName.trim()) e.landlordName = 'Required'
    if (!rentData.address.trim())      e.address      = 'Required'
    if (!rentData.roomType)            e.roomType     = 'Required'
    if (!rentData.previousRent || parseFloat(rentData.previousRent) <= 0)
      e.previousRent = 'Enter a value greater than 0'
    if (!rentData.proposedRent || parseFloat(rentData.proposedRent) <= 0)
      e.proposedRent = 'Enter a value greater than 0'
    if (!rentData.effectiveDate) e.effectiveDate = 'Required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const pct = calcPercentageIncrease(rentData.previousRent, rentData.proposedRent)
    setLoading(true)

    let recordId = null
    try {
      const { data } = await supabase
        .from('rent_records')
        .insert({
          tenant_name:    rentData.tenantName,
          landlord_name:  rentData.landlordName,
          address:        rentData.address,
          neighborhood:   rentData.neighborhood,
          room_type:      rentData.roomType,
          previous_rent:  parseFloat(rentData.previousRent),
          proposed_rent:  parseFloat(rentData.proposedRent),
          effective_date: rentData.effectiveDate,
        })
        .select()
        .single()
      recordId = data?.id ?? null
    } catch {
      // Supabase not configured — continue without persisting
    } finally {
      updateRentData({ percentageIncrease: pct, currentRecordId: recordId })
      setLoading(false)
      navigate('/legal')
    }
  }

  function setField(key, value) {
    updateRentData({ [key]: value })
    if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Tenant Full Name *</label>
          <input
            className="form-input"
            value={rentData.tenantName}
            onChange={e => setField('tenantName', e.target.value)}
            placeholder="e.g. Kofi Mensah"
          />
          {errors.tenantName && <p className="text-red-500 text-xs mt-1">{errors.tenantName}</p>}
        </div>

        <div>
          <label className="form-label">Landlord Full Name *</label>
          <input
            className="form-input"
            value={rentData.landlordName}
            onChange={e => setField('landlordName', e.target.value)}
            placeholder="e.g. Ama Asante"
          />
          {errors.landlordName && <p className="text-red-500 text-xs mt-1">{errors.landlordName}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Neighborhood</label>
        <input
          className="form-input bg-gray-50"
          value={rentData.neighborhood}
          onChange={e => setField('neighborhood', e.target.value)}
        />
      </div>

      <div>
        <label className="form-label">Property Address *</label>
        <input
          className="form-input"
          value={rentData.address}
          onChange={e => setField('address', e.target.value)}
          placeholder="e.g. House 12, Block C, Community 23"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className="form-label">Room / Unit Type *</label>
        <select
          className="form-select"
          value={rentData.roomType}
          onChange={e => setField('roomType', e.target.value)}
        >
          <option value="">Select room type</option>
          {ROOM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.roomType && <p className="text-red-500 text-xs mt-1">{errors.roomType}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Current Monthly Rent (GHS) *</label>
          <input
            type="number"
            min="1"
            step="0.01"
            className="form-input"
            value={rentData.previousRent}
            onChange={e => setField('previousRent', e.target.value)}
            placeholder="e.g. 1200"
          />
          {errors.previousRent && <p className="text-red-500 text-xs mt-1">{errors.previousRent}</p>}
        </div>

        <div>
          <label className="form-label">Proposed New Rent (GHS) *</label>
          <input
            type="number"
            min="1"
            step="0.01"
            className="form-input"
            value={rentData.proposedRent}
            onChange={e => setField('proposedRent', e.target.value)}
            placeholder="e.g. 1800"
          />
          {errors.proposedRent && <p className="text-red-500 text-xs mt-1">{errors.proposedRent}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Effective Date of Increase *</label>
        <input
          type="date"
          className="form-input"
          value={rentData.effectiveDate}
          onChange={e => setField('effectiveDate', e.target.value)}
        />
        {errors.effectiveDate && <p className="text-red-500 text-xs mt-1">{errors.effectiveDate}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Saving…' : 'Calculate & Check My Rights →'}
      </button>
    </form>
  )
}
