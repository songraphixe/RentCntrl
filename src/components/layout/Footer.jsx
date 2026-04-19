export default function Footer() {
  return (
    <footer className="bg-[#064e3b] text-white no-print">
      <div className="kente-stripe" />
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[#fbbf24] text-lg" aria-hidden>⚖</span>
          <p className="font-black text-sm uppercase tracking-tight">
            FairRent <span className="text-[#fbbf24]">Ghana</span>
            <span className="text-white/40 font-normal normal-case tracking-normal ml-2">
              — Empowering tenants in Tema Community 23
            </span>
          </p>
        </div>
        <p className="text-white/40 text-xs uppercase tracking-widest text-center sm:text-right">
          Protected under the Ghana Rent Act, 1963 (Act 220)
        </p>
      </div>
    </footer>
  )
}
