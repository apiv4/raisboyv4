import { DocSection } from "@/components/doc-section"
import {
  EndpointDetailsCard,
  type EndpointParam,
  type EndpointResponse,
  type EndpointErrorCode,
} from "@/components/endpoint-details-card"

const params: EndpointParam[] = [
  {
    name: "user_id",
    type: "string",
    required: true,
    description: "User identifier on the platform",
  },
]

const responses: EndpointResponse[] = [
  {
    title: "Success Response",
    statusCode: 201,
    variant: "success",
    json: JSON.stringify(
      {
        status: "success",
        user_id: "user_12345",
        max_amount: 50000000,
      },
      null,
      2
    ),
  },
  {
    title: "Error Response",
    statusCode: 404,
    variant: "error",
    json: JSON.stringify(
      {
        status: "error",
        error_code: 404,
        message: "USER_NOT_FOUND",
      },
      null,
      2
    ),
  },
]

const errorCodes: EndpointErrorCode[] = [
  { code: 404, message: "USER_NOT_FOUND", description: "User does not exist in system" },
  { code: 403, message: "PROHIBITED_FOR_USER", description: "User must contact support" },
  { code: 401, message: "INVALID_SIGNATURE", description: "Invalid request signature" },
]

export function UserValidationSection() {
  return (
    <DocSection
      id="user-validation"
      title="User Validation"
      description="Validate user existence and retrieve maximum transaction limits."
    >
      <EndpointDetailsCard
        method="POST"
        path="/api/v4/payments/raisboy/validate-user"
        description="Validate user existence and retrieve maximum transaction limits before initiating deposits or payouts."
        parameters={params}
        responses={responses}
        errorCodes={errorCodes}
      />
    </DocSection>
  )
}
