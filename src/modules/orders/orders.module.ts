import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName, OrderSchema } from './schemas/order.schema';
import { AuthzModule } from '../authz/authz.module';

@Module({
  imports: [
    AuthzModule,
    MongooseModule.forFeature([{ name: ModelName, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
