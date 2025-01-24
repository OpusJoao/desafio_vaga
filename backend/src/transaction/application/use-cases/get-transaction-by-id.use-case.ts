import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { Model } from 'mongoose';

@Injectable()
export default class GetTransactionByIdUseCase {
  constructor(
    @InjectModel(TransactionEntity.name)
    private transactionModel: Model<TransactionEntity>,
  ) {}
  async execute(id: string): Promise<TransactionEntity> {

    return this.transactionModel.findById(id);
  }
}
