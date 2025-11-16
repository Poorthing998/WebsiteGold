'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Home,
  Car,
  Plane,
  GraduationCap,
  Calendar,
  Target,
  Trophy,
  ArrowUpRight,
  Coins,
  Crown
} from 'lucide-react'

const GOLD_PRICE_PER_GRAM = 62.50
const ANNUAL_GOLD_APPRECIATION = 0.08 // 8% average annual appreciation

interface MilestoneGoal {
  name: string
  icon: any
  gramsNeeded: number
  emoji: string
  color: string
  image: string
}

const MILESTONE_GOALS: MilestoneGoal[] = [
  {
    name: 'Vacation Fund',
    icon: Plane,
    gramsNeeded: 80,
    emoji: '✈️',
    color: 'from-blue-500 to-cyan-500',
    image: '🏝️'
  },
  {
    name: 'New Car',
    icon: Car,
    gramsNeeded: 400,
    emoji: '🚗',
    color: 'from-red-500 to-orange-500',
    image: '🚙'
  },
  {
    name: 'Education Fund',
    icon: GraduationCap,
    gramsNeeded: 800,
    emoji: '🎓',
    color: 'from-purple-500 to-pink-500',
    image: '📚'
  },
  {
    name: 'Dream Home',
    icon: Home,
    gramsNeeded: 3200,
    emoji: '🏡',
    color: 'from-emerald-500 to-teal-500',
    image: '🏠'
  },
]

interface Props {
  monthlyGrams: number
  bonusPercentage: number
}

export default function SavingsProjection({ monthlyGrams, bonusPercentage }: Props) {
  const [timeframe, setTimeframe] = useState<'1' | '3' | '5' | '10'>('5')
  const [selectedMilestone, setSelectedMilestone] = useState<number>(2)

  const projection = useMemo(() => {
    const years = parseInt(timeframe)
    const months = years * 12
    const monthlyWithBonus = monthlyGrams * (1 + bonusPercentage / 100)

    let totalGrams = 0
    let totalValue = 0
    const timeline = []

    for (let month = 1; month <= months; month++) {
      totalGrams += monthlyWithBonus
      // Compound appreciation
      const yearsFraction = month / 12
      const appreciatedValue = totalGrams * GOLD_PRICE_PER_GRAM * Math.pow(1 + ANNUAL_GOLD_APPRECIATION, yearsFraction)

      if (month % 12 === 0 || month === 1 || month === months) {
        timeline.push({
          month,
          year: Math.floor(month / 12),
          grams: totalGrams,
          value: appreciatedValue
        })
      }

      totalValue = appreciatedValue
    }

    return {
      totalGrams,
      totalValue,
      timeline,
      monthlyInvestment: monthlyGrams * GOLD_PRICE_PER_GRAM,
      totalInvested: months * monthlyGrams * GOLD_PRICE_PER_GRAM,
      profit: totalValue - (months * monthlyGrams * GOLD_PRICE_PER_GRAM)
    }
  }, [timeframe, monthlyGrams, bonusPercentage])

  const achievedMilestones = MILESTONE_GOALS.filter(
    goal => projection.totalGrams >= goal.gramsNeeded
  )

  const nextMilestone = MILESTONE_GOALS.find(
    goal => projection.totalGrams < goal.gramsNeeded
  )

  const selectedGoal = MILESTONE_GOALS[selectedMilestone]
  const monthsToGoal = Math.ceil(
    selectedGoal.gramsNeeded / (monthlyGrams * (1 + bonusPercentage / 100))
  )
  const yearsToGoal = Math.floor(monthsToGoal / 12)
  const remainingMonths = monthsToGoal % 12

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-2 border-amber-300 rounded-full"
        >
          <Target className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-amber-900">Future Projections</span>
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Watch Your Wealth{' '}
          <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Compound
          </span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          See exactly how your savings plan builds generational wealth over time
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center gap-3">
        {(['1', '3', '5', '10'] as const).map((years) => (
          <motion.button
            key={years}
            onClick={() => setTimeframe(years)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              timeframe === years
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300'
            }`}
          >
            {years} {years === '1' ? 'Year' : 'Years'}
          </motion.button>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Grams */}
        <motion.div
          layout
          className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <Coins className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Total Gold</span>
            </div>
            <motion.div
              key={projection.totalGrams}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold mb-1"
            >
              {projection.totalGrams.toFixed(1)}g
            </motion.div>
            <div className="text-sm opacity-80">
              Worth ${projection.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
        </motion.div>

        {/* Profit */}
        <motion.div
          layout
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <TrendingUp className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Projected Gain</span>
            </div>
            <motion.div
              key={projection.profit}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold mb-1"
            >
              +${projection.profit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </motion.div>
            <div className="text-sm opacity-80">
              {((projection.profit / projection.totalInvested) * 100).toFixed(1)}% return
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          layout
          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 opacity-10">
            <Trophy className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Milestones</span>
            </div>
            <motion.div
              key={achievedMilestones.length}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold mb-1"
            >
              {achievedMilestones.length}/{MILESTONE_GOALS.length}
            </motion.div>
            <div className="text-sm opacity-80">
              {nextMilestone ? `Next: ${nextMilestone.name}` : 'All unlocked!'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Visualization */}
      <motion.div
        layout
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-amber-600" />
          Your Savings Journey
        </h3>

        <div className="space-y-4">
          {projection.timeline.map((point, idx) => {
            const percentage = (point.value / projection.totalValue) * 100
            const isLast = idx === projection.timeline.length - 1

            return (
              <motion.div
                key={point.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      isLast
                        ? 'bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg'
                        : 'bg-gradient-to-br from-slate-400 to-slate-500'
                    }`}>
                      {point.month === 1 ? '🚀' : point.year > 0 ? `${point.year}Y` : '1M'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {point.year > 0 ? `Year ${point.year}` : 'Month 1'}
                      </div>
                      <div className="text-sm text-slate-500">
                        {point.grams.toFixed(1)}g accumulated
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-slate-900">
                      ${point.value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                    {idx > 0 && (
                      <div className="text-xs text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        {(((point.value - projection.timeline[idx - 1].value) / projection.timeline[idx - 1].value) * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: idx * 0.1 + 0.2, duration: 0.8 }}
                    className={`h-full ${
                      isLast
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                        : 'bg-gradient-to-r from-slate-300 to-slate-400'
                    }`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Milestone Goals Selector */}
      <motion.div
        layout
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold">Your Dream Goal</h3>
          </div>

          {/* Goal Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {MILESTONE_GOALS.map((goal, idx) => (
              <motion.button
                key={goal.name}
                onClick={() => setSelectedMilestone(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl transition-all relative overflow-hidden ${
                  selectedMilestone === idx
                    ? 'bg-gradient-to-br from-yellow-500 to-amber-500 shadow-xl'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className="text-3xl mb-2">{goal.emoji}</div>
                <div className="text-sm font-semibold">{goal.name}</div>
                {projection.totalGrams >= goal.gramsNeeded && (
                  <div className="absolute top-1 right-1">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Selected Goal Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMilestone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-7xl mb-4">{selectedGoal.image}</div>
                  <h4 className="text-3xl font-bold mb-3">{selectedGoal.name}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Gold Needed</span>
                      <span className="font-bold text-xl">{selectedGoal.gramsNeeded}g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Current Value</span>
                      <span className="font-bold text-xl">
                        ${(selectedGoal.gramsNeeded * GOLD_PRICE_PER_GRAM).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-px bg-white/20 my-3" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Time to Goal</span>
                      <span className="font-bold text-2xl text-yellow-400">
                        {yearsToGoal > 0 && `${yearsToGoal}y `}
                        {remainingMonths}m
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Progress to Goal */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/70">Progress</span>
                        <span className="text-sm font-bold">
                          {Math.min(100, (projection.totalGrams / selectedGoal.gramsNeeded) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(100, (projection.totalGrams / selectedGoal.gramsNeeded) * 100)}%`
                          }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                        />
                      </div>
                    </div>

                    {projection.totalGrams >= selectedGoal.gramsNeeded ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500 rounded-xl p-4 text-center"
                      >
                        <div className="text-4xl mb-2">🎉</div>
                        <div className="font-bold text-lg">Goal Achieved!</div>
                        <div className="text-sm opacity-90">
                          You've reached this milestone in {timeframe} years
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-white/70 mb-2">Monthly Progress</div>
                        <div className="flex items-baseline gap-2">
                          <div className="text-3xl font-bold">
                            +{(monthlyGrams * (1 + bonusPercentage / 100)).toFixed(1)}g
                          </div>
                          <div className="text-white/70">per month</div>
                        </div>
                        <div className="mt-3 text-xs text-yellow-400">
                          {((monthlyGrams * (1 + bonusPercentage / 100) / selectedGoal.gramsNeeded) * 100).toFixed(2)}% closer each month
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Achievement Badges */}
      {achievedMilestones.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-bold text-slate-900">Unlocked Achievements</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {achievedMilestones.map((milestone) => (
              <motion.div
                key={milestone.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`bg-gradient-to-br ${milestone.color} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold`}
              >
                <span className="text-2xl">{milestone.emoji}</span>
                <span>{milestone.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
