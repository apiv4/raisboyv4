import { PaymentMethodsGrid } from '@/components/payment-methods-grid'

export function PaymentMethodsSection() {
  return (
    <section id="payment-methods" className="scroll-mt-24 py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="font-sans text-[28px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]" style={{ lineHeight: 1.3 }}>
          Payment Methods
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          Supported payment methods for deposits and payouts.
        </p>
        <div className="mt-4 h-px w-full bg-[var(--border-color)]" />
      </div>
      <PaymentMethodsGrid />
    </section>
  )
}
