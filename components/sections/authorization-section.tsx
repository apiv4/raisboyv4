'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Check, Copy } from 'lucide-react'

export function AuthorizationSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const pythonCode = `import hmac
import hashlib
import time
import requests
import json

# Configuration
API_KEY = "your_api_key_here"
SECRET_KEY = "your_secret_key_here"
BASE_URL = "https://api.raisboy.com"

def generate_signature(method, path, body, timestamp, api_key, secret_key):
    # Create signature string
    signature_string = f"{method}\\n{path}\\n{body}\\n{timestamp}\\n{api_key}"
    
    # Generate HMAC SHA256 signature
    signature = hmac.new(
        secret_key.encode('utf-8'),
        signature_string.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return signature

# Example request
method = "POST"
path = "/api/v4/payments/raisboy/validate-user"
body_data = {"user_id": "user123"}
body = json.dumps(body_data)
timestamp = str(int(time.time()))

# Generate signature
signature = generate_signature(method, path, body, timestamp, API_KEY, SECRET_KEY)

# Make request
headers = {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
    "X-Signature": signature,
    "X-Timestamp": timestamp
}

response = requests.post(f"{BASE_URL}{path}", headers=headers, data=body)
print(response.json())`

  const javascriptCode = `const crypto = require('crypto');
const axios = require('axios');

// Configuration
const API_KEY = 'your_api_key_here';
const SECRET_KEY = 'your_secret_key_here';
const BASE_URL = 'https://api.raisboy.com';

function generateSignature(method, path, body, timestamp, apiKey, secretKey) {
  // Create signature string
  const signatureString = \`\${method}\\n\${path}\\n\${body}\\n\${timestamp}\\n\${apiKey}\`;
  
  // Generate HMAC SHA256 signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(signatureString)
    .digest('hex');
  
  return signature;
}

// Example request
const method = 'POST';
const path = '/api/v4/payments/raisboy/validate-user';
const bodyData = { user_id: 'user123' };
const body = JSON.stringify(bodyData);
const timestamp = Math.floor(Date.now() / 1000).toString();

// Generate signature
const signature = generateSignature(method, path, body, timestamp, API_KEY, SECRET_KEY);

// Make request
axios.post(\`\${BASE_URL}\${path}\`, bodyData, {
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
    'X-Signature': signature,
    'X-Timestamp': timestamp
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));`

  const curlCode = `# First, generate the signature using your preferred method
# Then execute the cURL command

TIMESTAMP=$(date +%s)
METHOD="POST"
PATH="/api/v4/payments/raisboy/validate-user"
BODY='{"user_id":"user123"}'
API_KEY="your_api_key_here"
SECRET_KEY="your_secret_key_here"

# Signature string: METHOD\\nPATH\\nBODY\\nTIMESTAMP\\nAPI_KEY
SIGNATURE_STRING="$METHOD\\n$PATH\\n$BODY\\n$TIMESTAMP\\n$API_KEY"

# Generate HMAC SHA256 signature (requires openssl)
SIGNATURE=$(echo -n "$SIGNATURE_STRING" | openssl dgst -sha256 -hmac "$SECRET_KEY" | awk '{print $2}')

# Make the request
curl -X POST https://api.raisboy.com/api/v4/payments/raisboy/validate-user \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: $API_KEY" \\
  -H "X-Signature: $SIGNATURE" \\
  -H "X-Timestamp: $TIMESTAMP" \\
  -d "$BODY"`

  return (
    <section id="authorization" className="scroll-mt-24 py-12 lg:py-16">
      <div className="mb-8">
        <h2 className="font-sans text-[28px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]" style={{ lineHeight: 1.3 }}>
          Authorization
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          All API requests require HMAC SHA256 signature authentication with time-based validation.
        </p>
        <div className="mt-4 h-px w-full bg-[var(--border-color)]" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left column: Explanatory text (60%) */}
        <div className="lg:col-span-3 space-y-8">
          {/* HMAC SHA256 Explanation */}
          <div>
            <h3 className="font-sans text-[22px] font-semibold text-[var(--text-primary)] mb-4" style={{ lineHeight: 1.4 }}>
              HMAC SHA256 Signature
            </h3>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-6">
              Every API request must include an HMAC SHA256 signature to ensure authenticity and integrity. 
              The signature is generated using your secret key and a standardized signature string that includes 
              the request method, path, body, timestamp, and API key.
            </p>

            {/* Signature Formula Callout */}
            <div className="rounded-lg border-l-4 border-[var(--cyan-accent)] bg-[var(--navy-secondary)] p-6 mb-6">
              <div className="text-sm font-semibold text-[var(--cyan-accent)] uppercase tracking-wide mb-3">
                Signature String Formula
              </div>
              <pre className="font-mono text-sm text-[var(--text-primary)] overflow-x-auto">
                <code>{`{METHOD}\\n{PATH}\\n{BODY}\\n{TIMESTAMP}\\n{API_KEY}`}</code>
              </pre>
              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
                  HMAC Formula
                </div>
                <pre className="font-mono text-sm text-[var(--cyan-accent)]">
                  <code>hex(hmac_sha256(secret_key, signature_string))</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Required Headers Table */}
          <div>
            <h3 className="font-sans text-[22px] font-semibold text-[var(--text-primary)] mb-4" style={{ lineHeight: 1.4 }}>
              Required Headers
            </h3>
            <div className="rounded-lg border border-[var(--border-color)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--navy-primary)]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Header
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Format
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[var(--navy-secondary)]">
                  <tr className="border-t border-[var(--border-color)]">
                    <td className="py-3 px-4">
                      <code className="font-mono text-sm text-[var(--cyan-accent)]">Content-Type</code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-[var(--cyan-accent)] text-[var(--navy-primary)] text-xs font-semibold px-2 py-1 rounded">
                        required
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[var(--text-secondary)]">
                      application/json
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Request content type
                    </td>
                  </tr>
                  <tr className="border-t border-[var(--border-color)]">
                    <td className="py-3 px-4">
                      <code className="font-mono text-sm text-[var(--cyan-accent)]">X-API-Key</code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-[var(--cyan-accent)] text-[var(--navy-primary)] text-xs font-semibold px-2 py-1 rounded">
                        required
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[var(--text-secondary)]">
                      string
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Your project API key
                    </td>
                  </tr>
                  <tr className="border-t border-[var(--border-color)]">
                    <td className="py-3 px-4">
                      <code className="font-mono text-sm text-[var(--cyan-accent)]">X-Signature</code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-[var(--cyan-accent)] text-[var(--navy-primary)] text-xs font-semibold px-2 py-1 rounded">
                        required
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[var(--text-secondary)]">
                      hmac_sha256_hex
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      HMAC signature
                    </td>
                  </tr>
                  <tr className="border-t border-[var(--border-color)]">
                    <td className="py-3 px-4">
                      <code className="font-mono text-sm text-[var(--cyan-accent)]">X-Timestamp</code>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-[var(--cyan-accent)] text-[var(--navy-primary)] text-xs font-semibold px-2 py-1 rounded">
                        required
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-[var(--text-secondary)]">
                      unix_timestamp | iso8601
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                      Request timestamp (±5 min tolerance)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Interactive code examples (40%) */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <h3 className="font-sans text-[22px] font-semibold text-[var(--text-primary)] mb-4" style={{ lineHeight: 1.4 }}>
              Code Examples
            </h3>
            <Tabs defaultValue="python" className="w-full">
              <TabsList className="w-full bg-[var(--navy-primary)] border border-[var(--border-color)]">
                <TabsTrigger value="python" className="flex-1 data-[state=active]:bg-[var(--navy-secondary)] data-[state=active]:text-[var(--cyan-accent)]">
                  Python
                </TabsTrigger>
                <TabsTrigger value="javascript" className="flex-1 data-[state=active]:bg-[var(--navy-secondary)] data-[state=active]:text-[var(--cyan-accent)]">
                  JavaScript
                </TabsTrigger>
                <TabsTrigger value="curl" className="flex-1 data-[state=active]:bg-[var(--navy-secondary)] data-[state=active]:text-[var(--cyan-accent)]">
                  cURL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="python" className="mt-4">
                <div className="relative rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)] overflow-hidden">
                  <button
                    onClick={() => handleCopy(pythonCode, 'python')}
                    className="absolute top-3 right-3 p-2 rounded bg-[var(--navy-secondary)] hover:bg-[var(--navy-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--cyan-accent)] z-10"
                    aria-label="Copy code"
                  >
                    {copiedCode === 'python' ? (
                      <Check className="w-4 h-4 text-[var(--success)]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-[var(--text-primary)]">{pythonCode}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="javascript" className="mt-4">
                <div className="relative rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)] overflow-hidden">
                  <button
                    onClick={() => handleCopy(javascriptCode, 'javascript')}
                    className="absolute top-3 right-3 p-2 rounded bg-[var(--navy-secondary)] hover:bg-[var(--navy-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--cyan-accent)] z-10"
                    aria-label="Copy code"
                  >
                    {copiedCode === 'javascript' ? (
                      <Check className="w-4 h-4 text-[var(--success)]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-[var(--text-primary)]">{javascriptCode}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="curl" className="mt-4">
                <div className="relative rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)] overflow-hidden">
                  <button
                    onClick={() => handleCopy(curlCode, 'curl')}
                    className="absolute top-3 right-3 p-2 rounded bg-[var(--navy-secondary)] hover:bg-[var(--navy-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--cyan-accent)] z-10"
                    aria-label="Copy code"
                  >
                    {copiedCode === 'curl' ? (
                      <Check className="w-4 h-4 text-[var(--success)]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-[var(--text-primary)]">{curlCode}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
