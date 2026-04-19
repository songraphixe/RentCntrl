import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RentProvider } from './context/RentContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import LegalCheck from './pages/LegalCheck'
import Negotiation from './pages/Negotiation'
import Escalation from './pages/Escalation'
import Lease from './pages/Lease'

export default function App() {
  return (
    <RentProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/legal"       element={<LegalCheck />} />
              <Route path="/negotiation" element={<Negotiation />} />
              <Route path="/escalation"  element={<Escalation />} />
              <Route path="/lease"       element={<Lease />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </RentProvider>
  )
}
