import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { Model } from 'mongoose';

export interface DataListTransactionsInterface{
  limit?: number;
  page?: number;
}

@Injectable()
export default class ListTransactionUseCase {
  constructor(
    @InjectModel(TransactionEntity.name)
    private transactionModel: Model<TransactionEntity>,
  ) {}

  async execute(dataQuery: DataListTransactionsInterface) {
    dataQuery.page = dataQuery.page || 1;
    dataQuery.limit = dataQuery.limit || 10;
    const skip = (dataQuery.page - 1) * dataQuery.limit;
    const data = await this.transactionModel.find().skip(skip).limit(dataQuery.limit).exec();
    const total = await this.transactionModel.countDocuments().exec();

    return {
      data,
      currentPage: dataQuery.page,
      totalPages: Math.ceil(total / dataQuery.limit),
      totalItems: total,
    };
  }
}
