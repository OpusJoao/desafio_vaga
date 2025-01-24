import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionEntity,
  TransactionSchema,
} from '../transaction/domain/entities/transaction.entity';
import ProcessTransactioCustomerController from './presentation/controllers/process-transaction-queue.controller';
import ProcessTransactionController from './presentation/controllers/process-transaction.controller';
import SharedModule from '../shared/shared.module';
import TransactionModule from '../transaction/transaction.module';
import CustomerModule from '../customer/customer.module';
import ListTransactionProcessController from './presentation/controllers/list-transaction-process.controller';
import { TransactionFileEntity, TransactionFileSchema } from './domain/entities/transaction-file.entity';
import ListTransactionsFileUseCase from './application/use-cases/list-transactions-file.use-case';
import CreateTransactionFileUseCase from './application/use-cases/create-transaction-file.use-case';
import UpdateTransactionFileUseCase from './application/use-cases/update-transaction-file.use-case';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTION_ENGINE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://host.docker.internal:5672'],
          queue: 'transports-processing',
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: TransactionEntity.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([
      { name: TransactionFileEntity.name, schema: TransactionFileSchema },
    ]),
    SharedModule,
    TransactionModule,
    CustomerModule,
  ],
  controllers: [
    ProcessTransactionController,
    ProcessTransactioCustomerController,
    ListTransactionProcessController
  ],
  providers:[
    ListTransactionsFileUseCase,
    CreateTransactionFileUseCase,
    UpdateTransactionFileUseCase
  ],
  exports: [
    ListTransactionsFileUseCase,
    CreateTransactionFileUseCase,
    UpdateTransactionFileUseCase
  ]
})
export default class TranscationEngineModule { }
