'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  TrendingUp,
  Zap,
  Award,
  Lock,
  Sparkles,
  ChevronRight,
  Gift
} from 'lucide-react'

const GOLD_PRICE_PER_GRAM = 62.50 // USD per gram (example price)

const PRESET_AMOUNTS = [1, 5, 10, 25, 50, 100]

const REWARD_TIERS = [
  { min: 1, max: 9, bonus: 0, label: 'Starter', icon: '🥉', color: 'from-amber-600 to-amber-700' },
  { min: 10, max: 49, bonus: 2, label: 'Silver Saver', icon: '🥈', color: 'from-slate-400 to-slate-500' },
  { min: 50, max: 99, bonus: 5, label: 'Gold Builder', icon: '🥇', color: 'from-yellow-500 to-yellow-600' },
  { min: 100, max: Infinity, bonus: 10, label: 'Platinum Vault', icon: '💎', color: 'from-purple-500 to-purple-600' },
]

export default function HeroSection() {
  const [grams, setGrams] = useState(10)
  const [isRecurring, setIsRecurring] = useState(false)
  const [showBonus, setShowBonus] = useState(false)
  const [streak, setStreak] = useState(0)

  const currentTier = REWARD_TIERS.find(tier => grams >= tier.min && grams <= tier.max) || REWARD_TIERS[0]
  const totalPrice = grams * GOLD_PRICE_PER_GRAM
  const bonusGrams = isRecurring ? (grams * currentTier.bonus) / 100 : 0
  const totalWithBonus = grams + bonusGrams

  useEffect(() => {
    if (isRecurring) {
      setShowBonus(true)
      const timer = setTimeout(() => setStreak(Math.floor(Math.random() * 12) + 1), 500)
      return () => clearTimeout(timer)
    } else {
      setShowBonus(false)
      setStreak(0)
    }
  }, [isRecurring])

  const handleGramChange = (value: number) => {
    setGrams(Math.max(1, Math.min(1000, value)))
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-amber-200/50"
          >
            <Shield className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-slate-700">
              Secured in Austrian Vaults
            </span>
            <Lock className="w-3 h-3 text-amber-600" />
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
            >
              Build Wealth,{' '}
              <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                One Gram
              </span>{' '}
              at a Time
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-600 max-w-xl"
            >
              Start your gold savings journey. Bank-grade security meets effortless investing.
            </motion.p>
          </div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: TrendingUp, text: 'Zero Storage Fees' },
              { icon: Zap, text: 'Instant Liquidity' },
              { icon: Award, text: 'Rewards Program' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-200/50"
              >
                <feature.icon className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-slate-700">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Interactive Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-amber-100/50 relative overflow-hidden">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer pointer-events-none" />

            {/* Tier Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTier.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute -top-4 -right-4 z-10"
              >
                <div className={`bg-gradient-to-br ${currentTier.color} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2`}>
                  <span className="text-2xl">{currentTier.icon}</span>
                  <span className="font-bold text-sm">{currentTier.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-6">
              {/* Savings Plan Toggle */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200">
                <div className="flex items-center gap-3">
                  <Gift className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Smart Savings Plan</p>
                    <p className="text-xs text-slate-600">Earn up to 10% bonus gold</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsRecurring(!isRecurring)}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                    isRecurring ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 'bg-slate-300'
                  }`}
                >
                  <motion.div
                    className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ x: isRecurring ? 28 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Streak Counter (shown when recurring) */}
              <AnimatePresence>
                {isRecurring && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-slate-700">
                          Current Streak
                        </span>
                      </div>
                      <motion.span
                        key={streak}
                        initial={{ scale: 1.5, color: '#9333ea' }}
                        animate={{ scale: 1, color: '#475569' }}
                        className="text-2xl font-bold"
                      >
                        {streak} 🔥
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gold Amount Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Select Amount (grams)
                </label>

                {/* Preset Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_AMOUNTS.map((amount) => (
                    <motion.button
                      key={amount}
                      onClick={() => handleGramChange(amount)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        grams === amount
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {amount}g
                    </motion.button>
                  ))}
                </div>

                {/* Custom Input with Slider */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={grams}
                      onChange={(e) => handleGramChange(parseInt(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-lg font-semibold text-slate-900 focus:outline-none focus:border-amber-400 transition-colors"
                      min="1"
                      max="1000"
                    />
                    <span className="text-slate-500 font-medium">grams</span>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    value={grams}
                    onChange={(e) => handleGramChange(parseInt(e.target.value))}
                    min="1"
                    max="100"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>

              {/* Price Display */}
              <div className="space-y-3 p-5 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Base Amount</span>
                  <span className="font-semibold text-slate-900">{grams}g</span>
                </div>

                <AnimatePresence>
                  {bonusGrams > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-center text-green-600"
                    >
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Bonus ({currentTier.bonus}%)
                      </span>
                      <motion.span
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        className="font-bold"
                      >
                        +{bonusGrams.toFixed(2)}g
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-3 border-t-2 border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900">
                      {isRecurring ? 'Monthly Total' : 'Total'}
                    </span>
                    <div className="text-right">
                      <motion.div
                        key={totalWithBonus}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                      >
                        {totalWithBonus.toFixed(2)}g
                      </motion.div>
                      <div className="text-sm text-slate-500">
                        ${totalPrice.toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-lg">
                  {isRecurring ? 'Start Savings Plan' : 'Buy Now'}
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Security Note */}
              <p className="text-xs text-center text-slate-500">
                🔒 Stored in high-security vaults in Austria • Fully insured • Audited monthly
              </p>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl">
                ✓
              </div>
              <div>
                <p className="text-xs text-slate-500">Active Investors</p>
                <p className="text-lg font-bold text-slate-900">50,000+</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
