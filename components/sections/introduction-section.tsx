"use client"

import { DocSection, DocCard } from "@/components/doc-section"
import { Shield, Webhook, CreditCard, Banknote } from "lucide-react"

const features = [
  {
    icon: <Shield className="size-8 text-[var(--cyan-accent)]" />,
    title: "HMAC SHA256 Authentication",
    description:
      "Secure request signing with time-based validation and API key verification",
  },
  {
    icon: <Webhook className="size-8 text-[var(--cyan-accent)]" />,
    title: "Real-time Webhooks",
    description:
      "Instant notifications for payout confirmations and final status updates",
  },
  {
    icon: <CreditCard className="size-8 text-[var(--cyan-accent)]" />,
    title: "Multiple Payment Methods",
    description:
      "Support for bank cards, bank transfers, wallets, and cryptocurrency",
  },
  {
    icon: <Banknote className="size-8 text-[var(--cyan-accent)]" />,
    title: "UZS Currency Support",
    description:
      "Native Uzbekistani som processing for deposits and payouts",
  },
]

export function IntroductionSection() {
  return (
    <DocSection
      id="introduction"
      title="Introduction"
      description="This API enables payment agents to integrate deposit and payout functionality for the Raisboy platform. The guide covers authentication protocols, endpoint specifications, webhook implementations, and account management procedures."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <DocCard key={feature.title}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="font-sans text-lg font-semibold text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            </div>
          </DocCard>
        ))}
      </div>
    </DocSection>
  )
}
