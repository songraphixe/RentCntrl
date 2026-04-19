export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-sm no-print">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          <span className="text-yellow-400 font-semibold">FairRent Ghana</span>
          {' '}— Empowering tenants in Tema Community 23
        </p>
        <p className="text-gray-500">Protected under the Ghana Rent Act, 1963 (Act 220)</p>
      </div>
    </footer>
  )
}
