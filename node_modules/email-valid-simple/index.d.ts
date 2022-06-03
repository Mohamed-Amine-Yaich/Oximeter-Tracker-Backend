export interface EmailResults {
  valid: Array<string>;
  invalid: Array<string>;
}

export function validateAll(emails: Array<string>): EmailResults;
export function validate(email: string): boolean;
