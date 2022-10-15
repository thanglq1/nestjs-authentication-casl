import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.ap-south-1.amazonaws.com',
        port: 2587,
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false,
        auth: {
          user: 'AKIAZ3WJXGTF753B6IXQ',
          pass: 'BH3coeuMKR/8QJVUd1W0aU4VeTw4XGYoYzfnQhFGFYQI',
        },
      },
      defaults: {
        from: 'thanglq@teraark.com',
      },
      template: {
        dir: resolve(__dirname + '/../../templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
