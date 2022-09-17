import { IOrder } from './interfaces/order.interface';
import { Document } from 'mongoose';

export interface OrderMdel extends IOrder, Document {}
