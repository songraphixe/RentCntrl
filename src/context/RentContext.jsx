import { createContext, useContext, useState } from 'react'
import { calcPercentageIncrease } from '../lib/rentCalculations'

const RentContext = createContext(null)

export function RentProvider({ children }) {
  const [rentData, setRentData] = useState({
    neighborhood:    'Tema Community 23',
    roomType:        '',
    landlordName:    '',
    tenantName:      '',
    address:         '',
    previousRent:    '',
    proposedRent:    '',
    percentageIncrease: null,
    effectiveDate:   '',
    landlordRejected: false,
    currentRecordId: null,
    agreedRent:      '',
    leaseStart:      '',
    leaseDuration:   '12',
    renewalTerms:    'This agreement may be renewed by mutual written consent of both parties, with a minimum of 60 days written notice prior to expiry of the current term.',
  })

  function updateRentData(updates) {
    setRentData(prev => ({ ...prev, ...updates }))
  }

  return (
    <RentContext.Provider value={{ rentData, updateRentData, calcPercentageIncrease }}>
      {children}
    </RentContext.Provider>
  )
}

export function useRent() {
  const ctx = useContext(RentContext)
  if (!ctx) throw new Error('useRent must be used inside RentProvider')
  return ctx
}
