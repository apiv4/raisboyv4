const steps = [
  {
    number: "1",
    text: "Partner portal creates Raisboy merchant account with unique identifier and access credentials for API integration.",
  },
  {
    number: "2",
    text: "Account manager grants necessary permissions and configures access levels for the merchant account.",
  },
  {
    number: "3",
    text: "Deposit funds are distributed directly to individual user accounts. Withdrawal funds accumulate in the central merchant account.",
  },
  {
    number: "4",
    text: "Account funding and withdrawal processing are managed exclusively through the designated account manager.",
  },
]

export function AccountManagementSection() {
  return (
    <section id="account-management" className="scroll-mt-24 py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="font-sans text-[28px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]" style={{ lineHeight: 1.3 }}>
          Account Management
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          Step-by-step guide for setting up and managing merchant accounts.
        </p>
        <div className="mt-4 h-px w-full bg-[var(--border-color)]" />
      </div>
      <div className="rounded-lg border border-[var(--border-color)] bg-[var(--navy-secondary)] p-6 lg:p-8">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <span 
                  className="font-sans font-bold text-[var(--cyan-accent)]" 
                  style={{ 
                    fontSize: '48px',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {step.number}
                </span>
              </div>
              <div className="flex-1 pt-2">
                <p 
                  className="font-sans text-[var(--text-primary)]" 
                  style={{ 
                    fontSize: '16px',
                    lineHeight: '1.6',
                    letterSpacing: '0'
                  }}
                >
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
