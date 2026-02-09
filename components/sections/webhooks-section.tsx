'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export function WebhooksSection() {
  const [isIncomingBodyOpen, setIsIncomingBodyOpen] = useState(false)
  const [isOutgoingBodyOpen, setIsOutgoingBodyOpen] = useState(false)

  return (
    <section id="webhooks" className="scroll-mt-24 py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="font-sans text-[28px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]" style={{ lineHeight: 1.3 }}>
          Webhooks
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          Real-time notifications for payout confirmations and final status updates.
        </p>
        <div className="mt-4 h-px w-full bg-[var(--border-color)]" />
      </div>

      {/* Webhook 1: Incoming Payout Confirmation */}
      <div className="mb-8 rounded-lg border border-[var(--border-color)] border-l-[4px] border-l-[#49CC90] bg-[var(--navy-secondary)] p-6 lg:p-8">
        <h3 className="font-sans text-[22px] font-semibold text-[var(--text-primary)] mb-3" style={{ lineHeight: 1.4 }}>
          Incoming Payout Confirmation
        </h3>
        <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-6">
          This webhook confirms the possibility of a payout after validation requests. 
          The system sends this notification to indicate that a payout request has been accepted and is ready for processing.
        </p>

        {/* Headers */}
        <div className="mb-6">
          <h4 className="font-sans text-sm font-semibold uppercase tracking-wide text-[var(--cyan-accent)] mb-3">
            Required Headers
          </h4>
          <div className="rounded-lg bg-[var(--navy-primary)] p-6 font-mono text-sm">
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">Content-Type:</span> application/json</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">X-API-Key:</span> Your project API key</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">X-Signature:</span> HMAC SHA256 signature</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">X-Timestamp:</span> Unix timestamp or ISO 8601 (±5 min tolerance)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Request Body Accordion */}
        <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
          <button
            onClick={() => setIsIncomingBodyOpen(!isIncomingBodyOpen)}
            className="w-full flex items-center justify-between p-4 bg-[var(--navy-primary)] hover:bg-[#1a2332] transition-colors"
          >
            <span className="font-sans text-sm font-medium text-[var(--text-primary)]">
              Request Body Example
            </span>
            <div className="transform transition-transform duration-300" style={{ transform: isIncomingBodyOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              <ChevronRight className="h-5 w-5 text-[var(--cyan-accent)]" />
            </div>
          </button>
          
          {isIncomingBodyOpen && (
            <div className="p-6 bg-[var(--navy-primary)] border-t border-[var(--border-color)]">
              <pre className="font-mono text-sm overflow-x-auto">
                <code className="text-[var(--text-secondary)]">
                  {'{\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"success"</span>: <span className="text-[#49CC90]">true</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"payout_id"</span>: <span className="text-[#F39C12]">"payout_123456789"</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"status"</span>: <span className="text-[#F39C12]">"accepted"</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"amount"</span>: <span className="text-[#E74C3C]">5000.0</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"currency"</span>: <span className="text-[#F39C12]">"UZS"</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"webhook_url"</span>: <span className="text-[#F39C12]">"https://partner.com/api/payments/notify/sys123/payout_123456789"</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"request_id"</span>: <span className="text-[#F39C12]">"req_abc123def456"</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"timestamp"</span>: <span className="text-[#F39C12]">"2024-01-15T14:30:00Z"</span>{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Webhook 2: Final Payout Status */}
      <div className="mb-8 rounded-lg border border-[var(--border-color)] border-l-[4px] border-l-[var(--cyan-accent)] bg-[var(--navy-secondary)] p-6 lg:p-8">
        <h3 className="font-sans text-[22px] font-semibold text-[var(--text-primary)] mb-3" style={{ lineHeight: 1.4 }}>
          Final Payout Status
        </h3>
        <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-4">
          This webhook is sent to the <code className="font-mono text-sm bg-[var(--navy-primary)] px-2 py-1 rounded text-[var(--cyan-accent)]">webhook_url</code> provided in the incoming confirmation. 
          It notifies your system of the final payout outcome.
        </p>

        {/* Endpoint Badge */}
        <div className="inline-flex items-center gap-2 bg-[var(--cyan-accent)] text-[var(--navy-primary)] px-4 py-2 rounded-lg font-mono text-sm font-semibold mb-6">
          <span className="text-xs font-bold">POST</span>
          <span>/api/payments/notify/&lt;system_id&gt;/&lt;payout_id&gt;</span>
        </div>

        {/* Headers */}
        <div className="mb-6">
          <h4 className="font-sans text-sm font-semibold uppercase tracking-wide text-[var(--cyan-accent)] mb-3">
            Required Headers
          </h4>
          <div className="rounded-lg bg-[var(--navy-primary)] p-6 font-mono text-sm">
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">Content-Type:</span> application/json</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">X-API-Key:</span> Your project API key</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">X-Signature:</span> HMAC SHA256 signature</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--cyan-accent)] mr-2">•</span>
                <span><span className="text-[var(--text-primary)]">X-Timestamp:</span> Unix timestamp or ISO 8601 (±5 min tolerance)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Response Body Accordion */}
        <div className="border border-[var(--border-color)] rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setIsOutgoingBodyOpen(!isOutgoingBodyOpen)}
            className="w-full flex items-center justify-between p-4 bg-[var(--navy-primary)] hover:bg-[#1a2332] transition-colors"
          >
            <span className="font-sans text-sm font-medium text-[var(--text-primary)]">
              Response Body Example
            </span>
            <div className="transform transition-transform duration-300" style={{ transform: isOutgoingBodyOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              <ChevronRight className="h-5 w-5 text-[var(--cyan-accent)]" />
            </div>
          </button>
          
          {isOutgoingBodyOpen && (
            <div className="p-6 bg-[var(--navy-primary)] border-t border-[var(--border-color)]">
              <pre className="font-mono text-sm overflow-x-auto">
                <code className="text-[var(--text-secondary)]">
                  {'{\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"payout_id"</span>: <span className="text-[#F39C12]">"payout_123456789"</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"status"</span>: <span className="text-[#F39C12]">"completed"</span>, <span className="text-[var(--text-tertiary)]">// or "cancelled"</span>{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"amount"</span>: <span className="text-[#E74C3C]">5000.0</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"currency"</span>: <span className="text-[#F39C12]">"UZS"</span>,{'\n'}
                  {'  '}<span className="text-[var(--cyan-accent)]">"timestamp"</span>: <span className="text-[#F39C12]">"2024-01-15T14:35:22Z"</span>{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          )}
        </div>

        {/* Status Explanation Callout */}
        <div className="rounded-lg bg-[#2ECC71] bg-opacity-10 border border-[#2ECC71] border-opacity-30 p-4">
          <h5 className="font-sans text-sm font-semibold text-[#2ECC71] mb-2">Status Values</h5>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start">
              <span className="text-[#2ECC71] mr-2">✓</span>
              <span><span className="text-[var(--text-primary)] font-mono">completed</span> - Payout was successful, funds transferred</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--error)] mr-2">✗</span>
              <span><span className="text-[var(--text-primary)] font-mono">cancelled</span> - Payout was unsuccessful, no funds transferred</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Response Specifications Table */}
      <div className="rounded-lg border border-[var(--border-color)] bg-[var(--navy-secondary)] p-6 lg:p-8">
        <h3 className="font-sans text-[22px] font-semibold text-[var(--text-primary)] mb-6" style={{ lineHeight: 1.4 }}>
          Response Specifications
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--border-color)]">
                <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[var(--cyan-accent)] uppercase tracking-wide">
                  Status Code
                </th>
                <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[var(--cyan-accent)] uppercase tracking-wide">
                  Response Object
                </th>
                <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-[var(--cyan-accent)] uppercase tracking-wide">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[var(--navy-primary)] border-b border-[var(--border-color)] hover:bg-[#151f2e] transition-colors">
                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center bg-[#2ECC71] text-white font-mono text-sm font-bold px-3 py-1 rounded">
                    200
                  </span>
                </td>
                <td className="py-4 px-4">
                  <code className="font-mono text-sm text-[var(--cyan-accent)]">
                    {'{ "success": true }'}
                  </code>
                </td>
                <td className="py-4 px-4 text-sm text-[var(--text-secondary)]">
                  Webhook received and processed successfully
                </td>
              </tr>
              
              <tr className="bg-[var(--navy-secondary)] border-b border-[var(--border-color)] hover:bg-[#1f2a3f] transition-colors">
                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center bg-[var(--error)] text-white font-mono text-sm font-bold px-3 py-1 rounded">
                    400
                  </span>
                </td>
                <td className="py-4 px-4">
                  <code className="font-mono text-sm text-[var(--cyan-accent)]">
                    {'{ "error": "empty_body" }'}
                  </code>
                </td>
                <td className="py-4 px-4 text-sm text-[var(--text-secondary)]">
                  Request body is missing or empty
                </td>
              </tr>
              
              <tr className="bg-[var(--navy-primary)] border-b border-[var(--border-color)] hover:bg-[#151f2e] transition-colors">
                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center bg-[var(--error)] text-white font-mono text-sm font-bold px-3 py-1 rounded">
                    400
                  </span>
                </td>
                <td className="py-4 px-4">
                  <code className="font-mono text-sm text-[var(--cyan-accent)]">
                    {'{ "error": "invalid_json" }'}
                  </code>
                </td>
                <td className="py-4 px-4 text-sm text-[var(--text-secondary)]">
                  Request body contains malformed JSON
                </td>
              </tr>
              
              <tr className="bg-[var(--navy-secondary)] border-b border-[var(--border-color)] hover:bg-[#1f2a3f] transition-colors">
                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center bg-[var(--error)] text-white font-mono text-sm font-bold px-3 py-1 rounded">
                    401
                  </span>
                </td>
                <td className="py-4 px-4">
                  <code className="font-mono text-sm text-[var(--cyan-accent)]">
                    {'{ "error": "invalid_signature" }'}
                  </code>
                </td>
                <td className="py-4 px-4 text-sm text-[var(--text-secondary)]">
                  HMAC signature validation failed
                </td>
              </tr>
              
              <tr className="bg-[var(--navy-primary)] hover:bg-[#151f2e] transition-colors">
                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center bg-[var(--error)] text-white font-mono text-sm font-bold px-3 py-1 rounded">
                    404
                  </span>
                </td>
                <td className="py-4 px-4">
                  <code className="font-mono text-sm text-[var(--cyan-accent)]">
                    {'{ "error": "payment_not_found" }'}
                  </code>
                </td>
                <td className="py-4 px-4 text-sm text-[var(--text-secondary)]">
                  Payout ID does not exist in the system
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
