export interface MailProvider {
  sendMail(to: string, subject: string, variables, path: string): Promise<void>;
}
