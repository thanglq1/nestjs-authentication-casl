import * as mongoose from 'mongoose';

const ModelName = 'Users';
const RoleModelRef = 'Roles';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    roles: {
      type: [{ type: mongoose.Types.ObjectId, ref: RoleModelRef }],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export { ModelName, UserSchema };
