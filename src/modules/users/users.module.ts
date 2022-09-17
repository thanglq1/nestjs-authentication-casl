import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    RolesModule,
    // MongooseModule.forFeature([{ name: ModelName, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: ModelName,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const user = this;
            if (user.password) {
              const salt = bcrypt.genSaltSync(10);
              const hash = bcrypt.hashSync(user.password, salt);
              user.password = hash;
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
