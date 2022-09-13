import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from './schemas/user.schema';
import { UserModel } from './users.model';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(ModelName) private model: Model<UserModel>) {}

  async createUser(user: IUser) {
    return await new this.model(user).save();
  }

  async findOneUser(query: object) {
    return await this.model.findOne(query);
  }

  async findUsers(query: object) {
    return await this.model.find(query);
  }

  async findUserById(userId: string) {
    return await this.model.findById(userId);
  }
}
