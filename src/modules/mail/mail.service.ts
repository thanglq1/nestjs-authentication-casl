import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
    const path = resolve(__dirname + '/templates');
    console.log('path:::', path);
  }

  async sendVerifyEmail(toEmail: string, userName: string, url: string) {
    try {
      await this.mailerService.sendMail({
        to: toEmail,
        // from: config.get('mailer.from'),
        subject: 'Email Verification',
        template: resolve(__dirname + '/../../templates/verify.email.hbs'),
        context: {
          // Data to be sent to template engine.
          userName,
          url,
        },
      });
    } catch (error) {
      console.log(`Verify email error: ${error}`);
    }
  }
}
