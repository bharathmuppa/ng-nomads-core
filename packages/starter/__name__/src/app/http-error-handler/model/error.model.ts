interface Error {
  application_status_code?: string;
  status?: string;
  error?: string;
  severity?: number;
  message?: string;
  path?: string;
  timestamp?: string;
}
export interface AuthorizationData {
  errorType: string;
}

export interface ErrorData {
  errorData?: Error;
  title?: string;
  subTitle?: string;
  message?: string;
  showReload?: boolean;
  showConfirmAndContinue?: boolean;
}

