import { THREE_MONTH_DISCOUNT } from '../data/programs'

export type BillingCycle = 'monthly' | 'quarterly'

export interface PriceBreakdown {
  /** Effective price per month for the chosen cycle. */
  perMonth: number
  /** Amount charged each billing period. */
  billedAmount: number
  /** Total saved per billing period compared with paying monthly. */
  savings: number
}

const roundCents = (n: number) => Math.round(n * 100) / 100

export function getPrice(monthlyPrice: number, cycle: BillingCycle): PriceBreakdown {
  if (cycle === 'monthly') {
    return { perMonth: monthlyPrice, billedAmount: monthlyPrice, savings: 0 }
  }
  const perMonth = roundCents(monthlyPrice * (1 - THREE_MONTH_DISCOUNT))
  const billedAmount = roundCents(perMonth * 3)
  return { perMonth, billedAmount, savings: roundCents(monthlyPrice * 3 - billedAmount) }
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
