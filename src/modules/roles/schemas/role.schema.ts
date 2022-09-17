import * as mongoose from 'mongoose';
import { FeaturesType, PermissionsType } from 'src/shared/enums';

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

    featurePermissions: [
      {
        feature: {
          type: String,
          enum: Object.values(FeaturesType),
          required: true,
        },

        permissions: {
          type: [String],
          enum: Object.values(PermissionsType),
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export { ModelName, RoleSchema };
