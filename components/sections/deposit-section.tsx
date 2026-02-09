import { DocSection } from "@/components/doc-section"
import {
  EndpointDetailsCard,
  type EndpointParam,
  type EndpointResponse,
} from "@/components/endpoint-details-card"

const params: EndpointParam[] = [
  { name: "user_id", type: "string", required: true, description: "User platform identifier" },
  { name: "amount", type: "number", required: true, description: "Deposit amount" },
  { name: "currency", type: "string", required: true, description: "Currency code (UZS)" },
  { name: "payment_method", type: "string", required: true, description: "Payment method type" },
  { name: "status", type: "string", required: true, description: 'Always "paid" for deposits' },
  { name: "timestamp", type: "string", required: true, description: "ISO 8601 timestamp" },
]

const responses: EndpointResponse[] = [
  {
    title: "Success Response",
    statusCode: 201,
    variant: "success",
    json: JSON.stringify(
      {
        status: "success",
        deposit_id: "dep_abc123",
        user_id: "user_12345",
        amount: 100000,
        currency: "UZS",
        payment_method: "bank_card",
        created_at: "2025-01-15T10:30:00Z",
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

export function DepositSection() {
  return (
    <DocSection
      id="deposits"
      title="Deposit Creation"
      description="Create deposit transactions for users on the Raisboy platform."
    >
      <EndpointDetailsCard
        method="POST"
        path="/api/v4/payments/raisboy/deposit/create"
        description="Create a new deposit transaction for a validated user. Ensure the user has been validated before initiating a deposit."
        parameters={params}
        responses={responses}
      />
    </DocSection>
  )
}
