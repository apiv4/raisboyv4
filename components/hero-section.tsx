export function HeroSection() {
  return (
    <section className="flex min-h-[400px] w-full flex-col items-center justify-center bg-[var(--hero-bg)] px-8 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="font-sans text-4xl font-bold tracking-[-0.02em] text-white lg:text-[48px]"
          style={{ lineHeight: 1.2 }}
        >
          Raisboy Public API Documentation
        </h1>
        <p
          className="mt-6 font-sans text-lg font-normal text-[var(--text-secondary)] lg:text-xl"
          style={{ lineHeight: 1.5 }}
        >
          Comprehensive Integration Guide for Payment Agents
        </p>
        {/* Cyan accent line - Swiss Modernism geometric element */}
        <div className="mx-auto mt-8 h-1 w-[200px] bg-[var(--cyan-accent)]" />
      </div>
    </section>
  )
}
