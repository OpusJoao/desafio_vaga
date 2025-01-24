import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<TransactionEntity>;

@Schema({
  collection: 'transactions'
})
export class TransactionEntity {
  @Prop({_id: true})
  _id: string;

  @Prop()
  customerId: string;

  @Prop()
  date: string;
  
  @Prop()
  amount: number;
}

export const TransactionSchema =
  SchemaFactory.createForClass(TransactionEntity);
