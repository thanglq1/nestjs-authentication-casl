import mongoose from 'mongoose';

const ModelName = 'Orders';

const OrderSchema = new mongoose.Schema(
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

export { ModelName, OrderSchema };
