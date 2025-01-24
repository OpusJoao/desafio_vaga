import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { Model } from 'mongoose';

export interface DataListTransactionsInterface {
  startDate?: Date;
  endDate?: Date;
  startAmount?: number;
  endAmount?: number;
  limit?: number;
  page?: number;
}

@Injectable()
export default class ListTransactionUseCase {
  constructor(
    @InjectModel(TransactionEntity.name)
    private transactionModel: Model<TransactionEntity>,
  ) { }

  async execute(dataQuery: DataListTransactionsInterface) {
    dataQuery.page = dataQuery.page || 1;
    dataQuery.limit = dataQuery.limit || 10;
    const skip = (dataQuery.page - 1) * dataQuery.limit;
    const filter = this.generateFilter(dataQuery);
    const data = await this.transactionModel.find(filter).skip(skip).limit(dataQuery.limit).exec();
    const total = await this.transactionModel.countDocuments().exec();

    return {
      data,
      currentPage: dataQuery.page,
      totalPages: Math.ceil(total / dataQuery.limit),
      totalItems: total,
    };
  }

  generateFilter(dataQuery: DataListTransactionsInterface) {
    let filter = {};

    if (dataQuery.startDate || dataQuery.endDate) {
      filter = {
        ...filter,
        date: {
          ...(dataQuery.startDate && { $gte: new Date(dataQuery.startDate) }),
          ...(dataQuery.endDate && { $lte: new Date(dataQuery.endDate) })
        }
      };
    }

    if (dataQuery.startAmount || dataQuery.endAmount) {
      filter = {
        ...filter,
        amount: {
          ...(dataQuery.startAmount && { $gte: dataQuery.startAmount }),
          ...(dataQuery.endAmount && { $lte: dataQuery.endAmount })
        }
      };
    }

    return filter;
  }
}
