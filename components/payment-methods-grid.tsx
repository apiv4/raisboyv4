'use client'

import React from "react"

import { CreditCard, Wallet, Building2, Bitcoin } from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'bank_card',
    name: 'Card Transfer',
    icon: <CreditCard className="h-8 w-8" strokeWidth={1.5} />
  },
  {
    id: 'bank_transfer',
    name: 'Bank Account Transfer',
    icon: <Building2 className="h-8 w-8" strokeWidth={1.5} />
  },
  {
    id: 'wallet_transfer',
    name: 'E-Wallet Transfer',
    icon: <Wallet className="h-8 w-8" strokeWidth={1.5} />
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency Wallet',
    icon: <Bitcoin className="h-8 w-8" strokeWidth={1.5} />
  }
]

export function PaymentMethodsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className="group relative rounded-lg border-2 border-transparent bg-[var(--navy-secondary)] p-4 transition-all duration-200 hover:border-[var(--cyan-accent)]"
        >
          {/* Icon */}
          <div className="mb-4 flex items-center justify-start text-[var(--cyan-accent)]">
            {method.icon}
          </div>

          {/* Method Identifier */}
          <div className="mb-2 font-mono text-sm font-medium text-[var(--cyan-accent)]">
            {method.id}
          </div>

          {/* Descriptive Name */}
          <div className="text-base font-medium leading-relaxed text-[var(--text-primary)]">
            {method.name}
          </div>

          {/* Subtle gradient overlay on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--cyan-accent)] to-transparent opacity-0 mix-blend-overlay transition-opacity duration-200 group-hover:opacity-5" />
        </div>
      ))}
    </div>
  )
}
