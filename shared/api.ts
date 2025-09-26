/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface LeadCreateRequest {
  email: string;
  role: string;
  useCase: string;
  challenge: string;
  count: string;
  company?: string;
  meta?: Record<string, unknown>;
}

export interface LeadReferralUpdateRequest {
  type: "referral_update";
  email: string;
  referralSource: string;
}

export type LeadApiRequest = LeadCreateRequest | LeadReferralUpdateRequest;

export interface LeadApiResponse {
  ok?: boolean;
  error?: string;
}
