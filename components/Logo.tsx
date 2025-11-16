'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg blur-md opacity-50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 p-2 rounded-lg">
          <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 bg-clip-text text-transparent">
          GoldenGrams
        </span>
        <span className="text-[10px] -mt-1 text-slate-500 font-medium tracking-wider">
          AUSTRIAN VAULTS
        </span>
      </div>
    </motion.div>
  )
}
