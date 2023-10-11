import { MailProvider } from '../mail-provider';

interface MailMessage {
  to: string;
  subject: string;
  variables;
  path: string;
}
export class InMemoryMailProvider implements MailProvider {
  private message: MailMessage[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables,
    path: string,
  ): Promise<void> {
    this.message.push({
      to,
      path,
      subject,
      variables,
    });
  }
}
