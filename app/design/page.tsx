import DesignHero from '@/components/DesignHero'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'Gold Platform - Build Your Golden Future',
  description: 'Start investing in premium gold with as little as €1. Secure, insured, and delivered to your door.',
}

export default function DesignPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[160px] py-4 flex items-center justify-between">
          <Logo />

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline-animated transition-colors">
              How it Works
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline-animated transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline-animated transition-colors">
              About
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Log In
            </a>
            <button className="btn-primary text-sm py-2 px-4">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <DesignHero />

      {/* Additional sections could be added here */}
    </main>
  )
}
