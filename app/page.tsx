import HeroSection from '@/components/HeroSection'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </div>
      <HeroSection />
    </main>
  )
}
