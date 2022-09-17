import { Document, PopulateOptions } from 'mongoose';
import { Model } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  async create(entity: object) {
    return await new this.model(entity).save();
  }

  async find(
    query?: object,
    projection?: object,
    options?: object,
    populates: PopulateOptions[] = [],
  ) {
    return await this.model
      .find(query, projection, options)
      .populate(populates);
  }

  async findOne(
    query: object,
    projection?: object,
    populates: PopulateOptions[] = [],
  ) {
    return await (
      await this.model.findOne(query, projection)
    ).populate(populates);
  }

  async findById(
    id: string,
    projection?: object,
    options?: object,
    populates: PopulateOptions[] = [],
  ) {
    return await this.model
      .findById(id, projection, options)
      .populate(populates);
  }

  async updateMany(filter: object, update: object, options?: object) {
    return await this.model.updateMany(filter, update, options);
  }

  async updateOne(filter: object, update: object, options?: object) {
    return await this.model.updateOne(filter, update, options);
  }

  async findOneAndUpdate(filter: object, update: object, options?: object) {
    return await this.model.findOneAndUpdate(filter, update, options);
  }

  async findByIdAndUpdate(id: string, update: object, options?: object) {
    return await this.model.findByIdAndUpdate(id, update, options);
  }

  async deleteMany(filter: object) {
    return await this.model.deleteMany(filter);
  }

  async deleteOne(filter: object) {
    return await this.model.deleteOne(filter);
  }

  async findByIdAndDelete(id: string, options?: object) {
    return await this.model.findByIdAndDelete(id, options);
  }

  async findOneAndDelete(filter: object, options?: object) {
    return await this.model.findOneAndDelete(filter, options);
  }
}
