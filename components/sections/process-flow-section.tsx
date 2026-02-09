import { ProcessFlowDiagram } from '@/components/process-flow-diagram'

export function ProcessFlowSection() {
  return (
    <section id="process-flow" className="scroll-mt-24 py-8">
      <h3 className="mb-6 font-sans text-[22px] font-semibold text-[var(--text-primary)]" style={{ lineHeight: 1.4 }}>
        Process Flow
      </h3>
      <ProcessFlowDiagram />
    </section>
  )
}
