import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { OrderMdel } from './orders.model';
import { ModelName } from './schemas/order.schema';

@Injectable()
export class OrderRepository extends BaseRepository<OrderMdel> {
  constructor(@InjectModel(ModelName) model) {
    super(model);
  }
}
