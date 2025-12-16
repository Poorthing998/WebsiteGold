'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  Shield,
  Truck,
  TrendingUp,
  Coins,
  Euro,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

// Gold price for conversion
const GOLD_PRICE_PER_GRAM_EUR = 58.50

// Trust features data
const TRUST_FEATURES = [
  { icon: Shield, label: '100% Insured' },
  { icon: Truck, label: 'Physical Delivery' },
  { icon: TrendingUp, label: 'Saving plans' },
  { icon: Coins, label: '999.9 Fine Gold' },
  { icon: Euro, label: 'Start From €1' },
]

// Animated counter component
function AnimatedNumber({ value, duration = 0.5 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const startValue = displayValue
    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const animate = () => {
      const now = Date.now()
      if (now >= endTime) {
        setDisplayValue(value)
        return
      }
      const progress = (now - startTime) / (duration * 1000)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(startValue + (value - startValue) * eased)
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return <>{displayValue.toFixed(2)}</>
}

// Floating Gold Coin Component with 3D effects
function GoldCoin({ className }: { className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [15, -15])
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15])

  const springConfig = { stiffness: 150, damping: 15 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{
        perspective: 1000,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -8, 0],
        rotate: [17, 19, 17],
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/40 to-yellow-300/40 rounded-full blur-xl scale-110" />

      {/* Coin body */}
      <div className="relative w-[92px] h-[92px] rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(194, 152, 68, 0.95) 0%, rgba(209, 179, 108, 0.95) 17.51%, rgba(255, 248, 220, 0.95) 53.32%, rgba(222, 200, 146, 0.95) 70.27%, rgba(168, 121, 25, 0.95) 98.21%)',
          boxShadow: `
            inset 0 2px 4px rgba(255, 255, 255, 0.6),
            inset 0 -4px 8px rgba(139, 90, 0, 0.4),
            0 8px 32px rgba(168, 121, 25, 0.5),
            0 4px 16px rgba(139, 90, 0, 0.3)
          `,
        }}
      >
        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full border-2 border-amber-700/30" />

        {/* Text container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* GOLD text */}
          <span
            className="text-sm font-bold tracking-[0.2em] mt-1"
            style={{
              color: '#9A6A0E',
              textShadow: '0 1px 1px rgba(255,255,255,0.3), 0 -1px 1px rgba(0,0,0,0.2)'
            }}
          >
            GOLD
          </span>

          {/* 999.9 text */}
          <span
            className="text-xl font-bold -mt-0.5"
            style={{
              background: 'linear-gradient(180deg, #996A0F 0%, #B2811F 50%, #693805 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.3))'
            }}
          >
            999.9
          </span>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Sparkle effects */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Sparkles className="w-4 h-4 text-yellow-400" />
      </motion.div>
    </motion.div>
  )
}

// Particle effect component
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-amber-400/30 to-yellow-300/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0, 0.6, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default function DesignHero() {
  const [grams, setGrams] = useState('')
  const [euros, setEuros] = useState('')
  const [focusedInput, setFocusedInput] = useState<'grams' | 'euros' | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle grams input change
  const handleGramsChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setGrams(value)
      if (value && !isNaN(parseFloat(value))) {
        setEuros((parseFloat(value) * GOLD_PRICE_PER_GRAM_EUR).toFixed(2))
      } else {
        setEuros('')
      }
    }
  }

  // Handle euros input change
  const handleEurosChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setEuros(value)
      if (value && !isNaN(parseFloat(value))) {
        setGrams((parseFloat(value) / GOLD_PRICE_PER_GRAM_EUR).toFixed(4))
      } else {
        setGrams('')
      }
    }
  }

  // Mouse parallax effect for the image container
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const parallaxX = useTransform(mouseX, [-500, 500], [-10, 10])
  const parallaxY = useTransform(mouseY, [-500, 500], [-10, 10])

  const springConfig = { stiffness: 100, damping: 20 }
  const parallaxXSpring = useSpring(parallaxX, springConfig)
  const parallaxYSpring = useSpring(parallaxY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: '#F7F7F9' }}
    >
      {/* Animated background particles */}
      <Particles />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27, 41, 81, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27, 41, 81, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto pt-[130px] pb-20 px-4 md:px-[160px]">

        {/* Hero Content Section */}
        <motion.div
          className="flex flex-col items-center gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Headline with animated reveal */}
          <motion.h1
            className="text-center max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className="block font-normal tracking-[0.012em] leading-[72px]"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                color: '#2C2C2C',
                textShadow: '0px 4px 4px rgba(54, 54, 54, 0.1)'
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Build Your
              </motion.span>
              <br />
              <motion.span
                className="relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="relative z-10 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-medium">
                  Golden
                </span>
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-amber-200/50 to-yellow-200/50 -z-10 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
              </motion.span>
              {' '}Future
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-center max-w-[800px] px-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '20px',
              lineHeight: '30px',
              color: '#2C2C2C',
              letterSpacing: '0.012em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Start investing in premium gold with as little as €1. Secure, insured, and delivered to your door.
          </motion.p>

          {/* Input Section */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-row items-center gap-2">
              {/* Dual Input Container */}
              <motion.div
                className="flex items-center h-[44px] bg-white rounded-lg overflow-hidden"
                style={{
                  border: '1px solid #D1D4DC',
                  boxShadow: focusedInput ? '0 0 0 3px rgba(27, 41, 81, 0.1), 0 1px 2px rgba(10, 13, 18, 0.05)' : '0 1px 2px rgba(10, 13, 18, 0.05)'
                }}
                whileHover={{ boxShadow: '0 4px 12px rgba(10, 13, 18, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                {/* Grams Input */}
                <div className="flex items-center px-3 h-full gap-2">
                  <input
                    type="text"
                    value={grams}
                    onChange={(e) => handleGramsChange(e.target.value)}
                    onFocus={() => setFocusedInput('grams')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Grams"
                    className="w-[80px] h-full bg-transparent outline-none text-base"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: grams ? '#2C2C2C' : '#9A9A9A',
                      letterSpacing: '0.012em'
                    }}
                  />
                  {/* Gold bar icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <rect x="4" y="8" width="16" height="10" rx="1" fill="#9A9A9A" opacity="0.3"/>
                    <rect x="6" y="6" width="12" height="8" rx="1" fill="#9A9A9A" opacity="0.5"/>
                    <rect x="8" y="4" width="8" height="6" rx="1" fill="#9A9A9A"/>
                  </svg>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-[#D1D4DC]" />

                {/* Euros Input */}
                <div className="flex items-center px-3 h-full gap-2">
                  <input
                    type="text"
                    value={euros}
                    onChange={(e) => handleEurosChange(e.target.value)}
                    onFocus={() => setFocusedInput('euros')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Euros"
                    className="w-[80px] h-full bg-transparent outline-none text-base"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: euros ? '#2C2C2C' : '#9A9A9A',
                      letterSpacing: '0.012em'
                    }}
                  />
                  {/* Euro icon */}
                  <Euro className="w-5 h-5 text-[#9A9A9A] flex-shrink-0" />
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                className="flex items-center justify-center gap-2 px-4 h-[44px] rounded-lg font-normal text-white min-w-[130px]"
                style={{
                  background: '#1B2951',
                  boxShadow: '0px 1px 2px rgba(10, 13, 18, 0.05)'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 4px 16px rgba(27, 41, 81, 0.25)'
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', letterSpacing: '0.012em' }}>
                  Get Started
                </span>
                <motion.div
                  animate={{ x: isHovering ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>

            {/* Live conversion hint */}
            <AnimatePresence>
              {(grams || euros) && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-xs text-slate-500 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>
                    {grams && parseFloat(grams) > 0
                      ? `${parseFloat(grams).toFixed(4)}g = €${(parseFloat(grams) * GOLD_PRICE_PER_GRAM_EUR).toFixed(2)}`
                      : 'Enter amount to see conversion'
                    }
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust Features Row */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {TRUST_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-2 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon container */}
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ background: '#D1D4DC' }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: '#1B2951' }} />
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#2C2C2C',
                    letterSpacing: '0.012em'
                  }}
                >
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* App Preview Section */}
        <motion.div
          className="relative w-full max-w-[1120px] mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Floating Gold Coin */}
          <div className="absolute -top-6 right-8 md:right-24 z-20">
            <GoldCoin />
          </div>

          {/* Main Preview Container */}
          <motion.div
            className="relative w-full aspect-[1120/736] rounded-lg overflow-hidden"
            style={{
              boxShadow: '0px 20px 24px -4px rgba(10, 13, 18, 0.08), 0px 8px 8px -4px rgba(10, 13, 18, 0.03)',
              x: parallaxXSpring,
              y: parallaxYSpring,
            }}
          >
            {/* Placeholder for app screenshot - using gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1B2951 0%, #2d3f6d 50%, #1B2951 100%)',
              }}
            >
              {/* Mock app UI elements */}
              <div className="absolute inset-0 p-8">
                {/* Mock header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />
                    <div className="h-4 w-24 bg-white/20 rounded" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-white/20 rounded" />
                    <div className="h-4 w-16 bg-white/20 rounded" />
                    <div className="h-4 w-16 bg-white/20 rounded" />
                  </div>
                </div>

                {/* Mock dashboard */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="h-6 w-32 bg-white/20 rounded mb-4" />
                    <div className="h-40 bg-gradient-to-r from-amber-400/30 to-yellow-500/30 rounded-lg flex items-end p-4">
                      {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 mx-1 bg-gradient-to-t from-amber-400 to-yellow-400 rounded-t"
                          style={{ height: `${h}%` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="h-4 w-20 bg-white/20 rounded mb-2" />
                      <div className="h-8 w-28 bg-gradient-to-r from-amber-400/50 to-yellow-500/50 rounded" />
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="h-4 w-20 bg-white/20 rounded mb-2" />
                      <div className="h-8 w-24 bg-white/20 rounded" />
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="h-4 w-20 bg-white/20 rounded mb-2" />
                      <div className="h-8 w-20 bg-white/20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom gradient overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[209px] pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(247, 247, 249, 0) 0%, #F7F7F9 81.52%)'
              }}
            />
          </motion.div>

          {/* Decorative floating elements */}
          <motion.div
            className="absolute -left-8 top-1/3 w-16 h-16 rounded-full bg-gradient-to-br from-amber-200/40 to-yellow-100/40 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -right-4 bottom-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-100/30 blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
