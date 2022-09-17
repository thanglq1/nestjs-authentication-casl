import * as mongoose from 'mongoose';

const ModelName = 'Invoices';
const InvoiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export { ModelName, InvoiceSchema };
