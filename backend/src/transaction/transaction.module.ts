import { Module } from '@nestjs/common';
import TransactionController from './presentation/controllers/list-transactions.controller';
import ListTransactionUseCase from './application/use-cases/list-transaction.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionEntity,
  TransactionSchema,
} from './domain/entities/transaction.entity';
import CreateTransactionUseCase from './application/use-cases/create-transaction.use-case';
import GetTransactionByIdUseCase from './application/use-cases/get-transaction-by-id.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionEntity.name, schema: TransactionSchema },
    ]),
  ],
  providers: [ListTransactionUseCase, CreateTransactionUseCase, GetTransactionByIdUseCase],
  controllers: [TransactionController],
  exports: [CreateTransactionUseCase, GetTransactionByIdUseCase]
})
export default class TransactionModule {}
