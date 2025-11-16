# GoldenGrams - Gold Savings Platform

A modern, interactive landing page for **GoldenGrams**, a gold savings platform with Austrian vault storage. Features advanced gamification, savings projections, and milestone achievements.

## Features

### Hero Section
- 🎯 **Interactive Gold Selector**: Preset amounts and custom input with range slider
- 💎 **Gamification**: Tier-based rewards system (Starter, Silver Saver, Gold Builder, Platinum Vault)
- 🔥 **Streak Tracking**: Visual streak counter for recurring savings plans
- 🎁 **Bonus System**: Up to 10% bonus gold for savings plans
- 🔒 **Trust Elements**: Austrian vault security messaging
- 🎨 **Modern Design**: Gradient backgrounds, glassmorphism, responsive layout

### Advanced Savings Projections
- 📊 **Future Performance Calculator**: See 1, 3, 5, or 10-year projections
- 🏠 **Milestone Goals**: Visual achievement system (Vacation, Car, Education, Dream Home)
- 📈 **Timeline Visualization**: Year-by-year growth with compound appreciation (8% annual)
- 🎯 **Goal Tracking**: Progress bars showing path to major purchases
- 🏆 **Achievement Badges**: Unlockable milestones as you reach goals
- 💰 **Profit Projections**: Real-time ROI calculations with bonus inclusion
- 👑 **Dream Goal Selector**: Choose your target and see time to achievement

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

## How It Works

1. **Select Amount**: Choose how many grams of gold to purchase monthly
2. **Enable Savings Plan**: Toggle on to activate recurring purchases and bonuses
3. **View Projections**: Click "View Future Projections" to see long-term growth
4. **Track Goals**: Select a dream goal (home, car, education) to see time to achievement
5. **Unlock Achievements**: Earn badges as you reach milestone goals

## Customization

### Update Gold Price
Edit `components/HeroSection.tsx` and `components/SavingsProjection.tsx`:
```typescript
const GOLD_PRICE_PER_GRAM = 62.50 // Change to current market price
const ANNUAL_GOLD_APPRECIATION = 0.08 // 8% annual appreciation
```

### Modify Reward Tiers
Edit `components/HeroSection.tsx`:
```typescript
const REWARD_TIERS = [
  { min: 1, max: 9, bonus: 0, label: 'Starter', ... },
  // Add or modify tiers
]
```

### Customize Milestone Goals
Edit `components/SavingsProjection.tsx`:
```typescript
const MILESTONE_GOALS: MilestoneGoal[] = [
  { name: 'Vacation Fund', gramsNeeded: 80, ... },
  // Add or modify goals
]
```

## Build for Production

```bash
npm run build
npm start
```
