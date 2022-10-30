import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesModule } from '../roles/roles.module';
import { OrdersModule } from '../orders/orders.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { AuthzModule } from '../authz/authz.module';
import { MailModule } from '../mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.dev.env' : `.${ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'stg', 'prod').default('dev'),
        PORT: Joi.number().default(3000),
      }),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    InvoicesModule,
    OrdersModule,
    AuthzModule,
    MailModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(config.get('MONGO_URI')),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
