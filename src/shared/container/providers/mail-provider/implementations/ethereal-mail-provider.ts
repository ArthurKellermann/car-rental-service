import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import { MailProvider } from '../mail-provider';

@injectable()
export class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((e) => console.log(e));
  }
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br',
      subject,
      text: body,
      html: body,
    });

    console.log('Message sent: ' + message.messageId);
    console.log('Preview URL: ' + nodemailer.getTestMessageUrl(message));
  }
}
