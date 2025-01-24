import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionFileDocument = HydratedDocument<TransactionFileEntity>;

@Schema({
  collection: 'transactionsFile'
})
export class TransactionFileEntity {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  name: string;

  @Prop()
  size: number;

  @Prop()
  status: string;

  @Prop()
  updatedAt: Date;
}

export const TransactionFileSchema =
  SchemaFactory.createForClass(TransactionFileEntity);
