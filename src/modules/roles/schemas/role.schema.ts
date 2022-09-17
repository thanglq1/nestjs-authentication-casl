import * as mongoose from 'mongoose';

const ModelName = 'Roles';
const UserModelRef = 'Users';

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    users: {
      type: [{ type: mongoose.Types.ObjectId, ref: UserModelRef }],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export { ModelName, RoleSchema };
