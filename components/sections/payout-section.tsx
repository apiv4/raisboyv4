import { DocSection } from "@/components/doc-section"
import {
  EndpointDetailsCard,
  type EndpointParam,
  type EndpointResponse,
  type EndpointStatusCode,
} from "@/components/endpoint-details-card"

const params: EndpointParam[] = [
  { name: "user_id", type: "string", required: true, description: "User identifier" },
  { name: "amount", type: "number", required: true, description: "Payout amount" },
  { name: "currency", type: "string", required: true, description: "UZS currency" },
  { name: "payment_method", type: "string", required: true, description: "Method type" },
  { name: "request_id", type: "string", required: true, description: "Unique request identifier (idempotency)" },
  { name: "timestamp", type: "string", required: true, description: "ISO 8601 format" },
]

const responses: EndpointResponse[] = [
  {
    title: "Success Response",
    statusCode: 201,
    variant: "success",
    json: JSON.stringify(
      {
        status: "pending",
        payout_id: "payout_123456789",
        user_id: "user_12345",
        amount: 5000.0,
        currency: "UZS",
        payment_method: "bank_card",
        request_id: "req_abc123def456",
        created_at: "2024-01-15T14:30:00Z",
      },
      null,
      2
    ),
  },
  {
    title: "Error Response",
    statusCode: 400,
    variant: "error",
    json: JSON.stringify(
      {
        status: "error",
        error_code: 400,
        message: "INVALID_AMOUNT",
      },
      null,
      2
    ),
  },
]

const statusCodes: EndpointStatusCode[] = [
  { status: "pending", variant: "pending", description: "Payout initiated, awaiting processing" },
  { status: "completed", variant: "success", description: "Payout successfully paid out" },
  { status: "cancelled", variant: "error", description: "Payout failed or was cancelled" },
]

export function PayoutSection() {
  return (
    <DocSection
      id="payouts"
      title="Payout Creation"
      description="Initiate payout transactions with idempotency support."
    >
      <EndpointDetailsCard
        method="POST"
        path="/api/payout/create"
        description="Create a new payout transaction. Use a unique request_id for each request to ensure idempotency. The payout enters a pending state and is confirmed via webhook."
        parameters={params}
        responses={responses}
        statusCodes={statusCodes}
      />
    </DocSection>
  )
}
