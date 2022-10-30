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

@Module({
  imports: [
    UsersModule,
    AuthModule,
    RolesModule,
    InvoicesModule,
    OrdersModule,
    AuthzModule,
    MailModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nestlab'),
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
