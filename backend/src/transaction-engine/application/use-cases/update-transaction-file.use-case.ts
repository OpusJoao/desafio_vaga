import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionFileEntity } from '../../domain/entities/transaction-file.entity';

@Injectable()
export default class UpdateTransactionFileUseCase {
  constructor(
    @InjectModel(TransactionFileEntity.name)
    private transactionFileModel: Model<TransactionFileEntity>,
  ) {}

  async execute(name: string, updateData: Partial<TransactionFileEntity>) {
    const updatedTransactionFile = await this.transactionFileModel.findOneAndUpdate(
      { name }, 
      { $set: {
        ...updateData,
        updatedAt: new Date(Date.now())
      } },
      { new: true },
    );
    
    if (!updatedTransactionFile) {
      console.log('Transaction file not found')
    }

    return updatedTransactionFile;
  }
}
