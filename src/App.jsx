import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { RentProvider } from './context/RentContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import LegalCheck from './pages/LegalCheck'
import Negotiation from './pages/Negotiation'
import Escalation from './pages/Escalation'
import Lease from './pages/Lease'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/"            element={<div className="page-enter"><Home /></div>} />
      <Route path="/legal"       element={<div className="page-enter"><LegalCheck /></div>} />
      <Route path="/negotiation" element={<div className="page-enter"><Negotiation /></div>} />
      <Route path="/escalation"  element={<div className="page-enter"><Escalation /></div>} />
      <Route path="/lease"       element={<div className="page-enter"><Lease /></div>} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <RentProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </RentProvider>
    </AuthProvider>
  )
}
