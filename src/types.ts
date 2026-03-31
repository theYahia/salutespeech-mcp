export interface OAuthTokenResponse {
  access_token: string;
  expires_at: number;
}

export interface RecognitionResult {
  status: number;
  result: string[];
  normalized_text?: string;
}

export interface SynthesisResponse {
  data: Buffer;
  contentType: string;
}

export interface SaluteModel {
  name: string;
  sample_rate: number;
  languages: string[];
}
