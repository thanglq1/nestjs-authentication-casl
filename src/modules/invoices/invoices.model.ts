import { IInvoice } from './interfaces/invoice.interface';

import { Document } from 'mongoose';

export interface InvoiceModel extends IInvoice, Document {}
