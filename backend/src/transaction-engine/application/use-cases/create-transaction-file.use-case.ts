import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionFileEntity } from '../../domain/entities/transaction-file.entity';

@Injectable()
export default class CreateTransactionFileUseCase {
  constructor(
    @InjectModel(TransactionFileEntity.name)
    private transactionFileModel: Model<TransactionFileEntity>,
  ) {}
  async execute(transactionFileDto) {
    const createdTransactionFile = new this.transactionFileModel(transactionFileDto);

    return createdTransactionFile.save();
  }
}
