import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { InvoiceModel } from './invoices.model';
import { ModelName } from './schemas/invoice.schema';

@Injectable()
export class InvoiceRepository extends BaseRepository<InvoiceModel> {
  constructor(@InjectModel(ModelName) model) {
    super(model);
  }
}
