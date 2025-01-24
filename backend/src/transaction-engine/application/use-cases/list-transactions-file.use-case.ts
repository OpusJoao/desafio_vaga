import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionFileEntity } from '../../domain/entities/transaction-file.entity';

export interface DataListTransactionsFileInterface{
  name?: string;
  limit?: number;
  page?: number;
}

@Injectable()
export default class ListTransactionsFileUseCase {
  constructor(
    @InjectModel(TransactionFileEntity.name)
    private transactionFileModel: Model<TransactionFileEntity>,
  ) {}

  async execute(dataQuery: DataListTransactionsFileInterface) {
    dataQuery.page = dataQuery.page || 1;
    dataQuery.limit = dataQuery.limit || 10;
    const skip = (dataQuery.page - 1) * dataQuery.limit;
    const filter = this.generateFilter(dataQuery);
    const data = await this.transactionFileModel.find(filter).skip(skip).limit(dataQuery.limit).exec();
    const total = await this.transactionFileModel.countDocuments().exec();

    return {
      data,
      currentPage: dataQuery.page || 1,
      totalPages: Math.ceil(total / dataQuery.limit),
      totalItems: total,
    };
  }

  generateFilter(dataQuery: DataListTransactionsFileInterface){
    let filter: TransactionFileEntity = new TransactionFileEntity();

    if(dataQuery.name){
      filter.name = dataQuery.name;
    }

    return filter;
  }
}
