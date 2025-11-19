import Link from 'next/link'

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Vidya Raut Portfolio</h1>
        <p className="text-lg mb-8">Welcome! Please select your language:</p>
        <div className="space-x-4">
          <Link href="/en" className="bg-blue-500 text-white px-6 py-2 rounded">
            English
          </Link>
          <Link href="/hi" className="bg-green-500 text-white px-6 py-2 rounded">
            हिन्दी
          </Link>
          <Link href="/mr" className="bg-orange-500 text-white px-6 py-2 rounded">
            मराठी
          </Link>
        </div>
      </div>
    </div>
  )
}
