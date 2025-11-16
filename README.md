# Gold Platform - Hero Section

A modern, interactive hero section for a gold selling platform with advanced features including:

## Features

- 🎯 **Interactive Gold Selector**: Preset amounts and custom input with range slider
- 💎 **Gamification**: Tier-based rewards system (Starter, Silver Saver, Gold Builder, Platinum Vault)
- 🔥 **Streak Tracking**: Visual streak counter for recurring savings plans
- 🎁 **Bonus System**: Up to 10% bonus gold for savings plans
- ✨ **Advanced Animations**: Framer Motion powered smooth transitions
- 🔒 **Trust Elements**: Austrian vault security messaging
- 🎨 **Modern Design**: Gradient backgrounds, glassmorphism, responsive layout

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Lucide React** - Icon library

## Customization

Update the gold price in `components/HeroSection.tsx`:
```typescript
const GOLD_PRICE_PER_GRAM = 62.50 // Change to current market price
```

Modify reward tiers and bonuses:
```typescript
const REWARD_TIERS = [
  { min: 1, max: 9, bonus: 0, label: 'Starter', ... },
  // Add or modify tiers
]
```

## Build for Production

```bash
npm run build
npm start
```
