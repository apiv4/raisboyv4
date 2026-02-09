const errorCodes = [
  {
    statusCode: '200',
    responseObject: '{ "success": true }',
    description: 'Request processed successfully',
    type: 'success'
  },
  {
    statusCode: '201',
    responseObject: '{ "status": "success", "user_id": "...", "max_amount": ... }',
    description: 'User validation successful, returns user data and limits',
    type: 'success'
  },
  {
    statusCode: '201',
    responseObject: '{ "status": "success", "deposit_id": "...", "amount": ... }',
    description: 'Deposit created successfully',
    type: 'success'
  },
  {
    statusCode: '201',
    responseObject: '{ "status": "pending", "payout_id": "...", "amount": ... }',
    description: 'Payout initiated successfully',
    type: 'success'
  },
  {
    statusCode: '400',
    responseObject: '{ "error_code": 400, "message": "EMPTY_BODY" }',
    description: 'Request body is empty or missing',
    type: 'error'
  },
  {
    statusCode: '400',
    responseObject: '{ "error_code": 400, "message": "INVALID_JSON" }',
    description: 'Request body contains invalid JSON format',
    type: 'error'
  },
  {
    statusCode: '400',
    responseObject: '{ "error_code": 400, "message": "INVALID_AMOUNT" }',
    description: 'Amount exceeds user limits or is invalid',
    type: 'error'
  },
  {
    statusCode: '401',
    responseObject: '{ "error_code": 401, "message": "INVALID_SIGNATURE" }',
    description: 'HMAC signature validation failed - check secret key and signature generation',
    type: 'error'
  },
  {
    statusCode: '401',
    responseObject: '{ "error_code": 401, "message": "INVALID_TIMESTAMP" }',
    description: 'Request timestamp outside ±5 minute tolerance window',
    type: 'error'
  },
  {
    statusCode: '403',
    responseObject: '{ "error_code": 403, "message": "PROHIBITED_FOR_USER" }',
    description: 'User account restricted - must contact support',
    type: 'error'
  },
  {
    statusCode: '404',
    responseObject: '{ "error_code": 404, "message": "USER_NOT_FOUND" }',
    description: 'User does not exist in the system',
    type: 'error'
  },
  {
    statusCode: '404',
    responseObject: '{ "error_code": 404, "message": "PAYMENT_NOT_FOUND" }',
    description: 'Payment transaction not found for given ID',
    type: 'error'
  },
  {
    statusCode: '409',
    responseObject: '{ "error_code": 409, "message": "DUPLICATE_REQUEST" }',
    description: 'Request ID already used - ensure unique request_id for idempotency',
    type: 'error'
  },
  {
    statusCode: '500',
    responseObject: '{ "error_code": 500, "message": "INTERNAL_SERVER_ERROR" }',
    description: 'Unexpected server error - contact support if persists',
    type: 'error'
  }
]

export function ErrorCodesSection() {
  return (
    <section id="error-codes" className="scroll-mt-24 py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="font-sans text-[28px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]" style={{ lineHeight: 1.3 }}>
          Error Codes
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          Complete reference of error codes and response messages across all endpoints.
        </p>
        <div className="mt-4 h-px w-full bg-[var(--border-color)]" />
      </div>
      
      <div className="overflow-hidden rounded-lg border border-[var(--border-color)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--navy-secondary)]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                  Status Code
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                  Response Object
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-primary)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {errorCodes.map((error, index) => (
                <tr
                  key={index}
                  className="border-b border-[var(--border-color)] transition-colors hover:bg-[var(--navy-tertiary)]/20"
                  style={{
                    backgroundColor: index % 2 === 0 ? '#0D1B2A' : '#1B263B'
                  }}
                >
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded px-3 py-1 font-mono text-sm font-semibold ${
                        error.type === 'success'
                          ? 'bg-[var(--success)]/20 text-[var(--success)]'
                          : 'bg-[var(--error)]/20 text-[var(--error)]'
                      }`}
                    >
                      {error.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="font-mono text-sm text-[var(--cyan-accent)]">
                      {error.responseObject}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {error.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional context */}
      <div className="mt-8 rounded-lg border-l-4 border-[var(--cyan-accent)] bg-[var(--navy-secondary)] p-6">
        <h3 className="mb-2 font-sans text-lg font-semibold text-[var(--text-primary)]">
          Error Handling Best Practices
        </h3>
        <ul className="space-y-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan-accent)]" />
            <span>Always check the <code className="font-mono text-xs text-[var(--cyan-accent)]">error_code</code> field in responses to handle specific error scenarios</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan-accent)]" />
            <span>Implement retry logic with exponential backoff for 5xx server errors</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan-accent)]" />
            <span>Log all 401 errors as they indicate authentication configuration issues</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan-accent)]" />
            <span>Use unique <code className="font-mono text-xs text-[var(--cyan-accent)]">request_id</code> values to avoid 409 duplicate request errors</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
