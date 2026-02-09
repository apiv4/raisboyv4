'use client'

import { useState } from 'react'

type FlowType = 'deposit' | 'payout'

interface Node {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
}

interface Arrow {
  from: string
  to: string
  label?: string
}

export function ProcessFlowDiagram() {
  const [activeFlow, setActiveFlow] = useState<FlowType>('deposit')
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Define nodes for deposit flow
  const depositNodes: Node[] = [
    { id: 'validate', label: 'User Validation\nRequest', x: 50, y: 150, width: 140, height: 70 },
    { id: 'validate-success', label: 'Validation\nSuccess', x: 240, y: 150, width: 120, height: 70 },
    { id: 'deposit-request', label: 'Deposit\nRequest', x: 410, y: 150, width: 120, height: 70 },
    { id: 'deposit-response', label: 'Response\nSuccess', x: 580, y: 150, width: 120, height: 70 },
    { id: 'deposit-credited', label: 'Deposit\nCredited', x: 750, y: 150, width: 120, height: 70 },
  ]

  // Define nodes for payout flow
  const payoutNodes: Node[] = [
    { id: 'validate', label: 'User Validation\nRequest', x: 50, y: 80, width: 140, height: 70 },
    { id: 'validate-success', label: 'Validation\nSuccess', x: 240, y: 80, width: 120, height: 70 },
    { id: 'payout-request', label: 'Payout\nRequest', x: 410, y: 80, width: 120, height: 70 },
    { id: 'payout-response', label: 'Response\nPending', x: 580, y: 80, width: 120, height: 70 },
    { id: 'webhook-received', label: 'Webhook\nReceived', x: 410, y: 200, width: 120, height: 70 },
    { id: 'final-status', label: 'Final Status\nWebhook', x: 580, y: 200, width: 120, height: 70 },
  ]

  // Define arrows for deposit flow
  const depositArrows: Arrow[] = [
    { from: 'validate', to: 'validate-success', label: 'Valid' },
    { from: 'validate-success', to: 'deposit-request', label: 'Create' },
    { from: 'deposit-request', to: 'deposit-response', label: 'Process' },
    { from: 'deposit-response', to: 'deposit-credited', label: 'Credit' },
  ]

  // Define arrows for payout flow
  const payoutArrows: Arrow[] = [
    { from: 'validate', to: 'validate-success', label: 'Valid' },
    { from: 'validate-success', to: 'payout-request', label: 'Create' },
    { from: 'payout-request', to: 'payout-response', label: 'Process' },
    { from: 'payout-response', to: 'webhook-received', label: 'Confirm' },
    { from: 'webhook-received', to: 'final-status', label: 'Status' },
  ]

  const nodes = activeFlow === 'deposit' ? depositNodes : payoutNodes
  const arrows = activeFlow === 'deposit' ? depositArrows : payoutArrows

  // Helper function to get node center
  const getNodeCenter = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return { x: 0, y: 0 }
    return {
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
    }
  }

  // Create arrow path with proper direction
  const createArrowPath = (from: string, to: string) => {
    const fromCenter = getNodeCenter(from)
    const toCenter = getNodeCenter(to)
    
    const fromNode = nodes.find(n => n.id === from)
    const toNode = nodes.find(n => n.id === to)
    
    if (!fromNode || !toNode) return ''

    let startX, startY, endX, endY

    // Horizontal arrow
    if (Math.abs(fromCenter.y - toCenter.y) < 50) {
      startX = fromNode.x + fromNode.width
      startY = fromCenter.y
      endX = toNode.x
      endY = toCenter.y
    } 
    // Vertical arrow (for payout flow)
    else {
      startX = fromCenter.x
      startY = fromNode.y + fromNode.height
      endX = toCenter.x
      endY = toNode.y
    }

    return `M ${startX} ${startY} L ${endX} ${endY}`
  }

  // Arrow marker for direction
  const ArrowMarker = () => (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <polygon points="0 0, 10 3, 0 6" fill="var(--cyan-accent)" />
      </marker>
    </defs>
  )

  return (
    <div className="w-full">
      {/* Flow Type Toggle */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setActiveFlow('deposit')}
          className={`rounded px-4 py-2 font-sans text-sm font-semibold transition-all ${
            activeFlow === 'deposit'
              ? 'bg-[var(--cyan-accent)] text-[var(--navy-primary)]'
              : 'bg-[var(--navy-primary)] text-[var(--text-secondary)] hover:text-[var(--cyan-accent)]'
          }`}
          style={{ border: activeFlow === 'deposit' ? 'none' : '1px solid var(--border-color)' }}
        >
          Deposit Flow
        </button>
        <button
          onClick={() => setActiveFlow('payout')}
          className={`rounded px-4 py-2 font-sans text-sm font-semibold transition-all ${
            activeFlow === 'payout'
              ? 'bg-[var(--cyan-accent)] text-[var(--navy-primary)]'
              : 'bg-[var(--navy-primary)] text-[var(--text-secondary)] hover:text-[var(--cyan-accent)]'
          }`}
          style={{ border: activeFlow === 'payout' ? 'none' : '1px solid var(--border-color)' }}
        >
          Payout Flow
        </button>
      </div>

      {/* SVG Diagram */}
      <div className="w-full overflow-x-auto rounded-lg bg-[var(--navy-secondary)] p-8">
        <svg
          viewBox="0 0 920 320"
          className="w-full"
          style={{ minHeight: '320px', maxWidth: '100%' }}
        >
          <ArrowMarker />

          {/* Draw arrows first (so they appear behind nodes) */}
          {arrows.map((arrow, idx) => {
            const path = createArrowPath(arrow.from, arrow.to)
            const fromCenter = getNodeCenter(arrow.from)
            const toCenter = getNodeCenter(arrow.to)
            const midX = (fromCenter.x + toCenter.x) / 2
            const midY = (fromCenter.y + toCenter.y) / 2

            return (
              <g key={`arrow-${idx}`}>
                <path
                  d={path}
                  stroke="var(--cyan-accent)"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  className="transition-all"
                  style={{
                    opacity: hoveredNode && (hoveredNode === arrow.from || hoveredNode === arrow.to) ? 1 : 0.6
                  }}
                />
                {arrow.label && (
                  <text
                    x={midX}
                    y={midY - 8}
                    textAnchor="middle"
                    className="font-sans text-xs"
                    fill="var(--text-tertiary)"
                    style={{ fontSize: '12px' }}
                  >
                    {arrow.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Draw nodes */}
          {nodes.map(node => (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx="8"
                fill="var(--navy-primary)"
                stroke="var(--cyan-accent)"
                strokeWidth={hoveredNode === node.id ? '3' : '2'}
                className="transition-all"
                style={{
                  filter: hoveredNode === node.id ? 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.4))' : 'none'
                }}
              />
              <text
                x={node.x + node.width / 2}
                y={node.y + node.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-sans text-sm font-semibold"
                fill={hoveredNode === node.id ? 'var(--cyan-accent)' : 'var(--text-primary)'}
                style={{ fontSize: '14px', lineHeight: '1.4' }}
              >
                {node.label.split('\n').map((line, i, arr) => (
                  <tspan
                    key={i}
                    x={node.x + node.width / 2}
                    dy={i === 0 ? `${-(arr.length - 1) * 0.6}em` : '1.2em'}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Flow Description */}
      <div className="mt-6 rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)] p-4">
        <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
          {activeFlow === 'deposit' ? (
            <>
              <strong className="text-[var(--cyan-accent)]">Deposit Flow:</strong> User validation confirms eligibility, 
              followed by deposit request creation with payment details. Upon successful processing, funds are immediately 
              credited to the user account with confirmation response.
            </>
          ) : (
            <>
              <strong className="text-[var(--cyan-accent)]">Payout Flow:</strong> After user validation, payout request 
              is initiated and enters pending state. Agent receives confirmation webhook, processes payment, then sends 
              final status webhook indicating completion or cancellation.
            </>
          )}
        </p>
      </div>
    </div>
  )
}
