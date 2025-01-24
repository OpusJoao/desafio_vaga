import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<CustomerEntity>;

@Schema({
  collection: 'customers'
})
export class CustomerEntity {
  @Prop()
  name: string;

  @Prop()
  document: string;
}

export const CustomerSchema =
  SchemaFactory.createForClass(CustomerEntity);
