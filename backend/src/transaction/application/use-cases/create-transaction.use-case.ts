import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { Model } from 'mongoose';

@Injectable()
export default class CreateTransactionUseCase {
  constructor(
    @InjectModel(TransactionEntity.name)
    private transactionModel: Model<TransactionEntity>,
  ) {}
  async execute(transactionDto) {
    const createdTransaction = new this.transactionModel(transactionDto);

    return createdTransaction.save();
  }
}
