import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { S3Storage } from '../../../shared/infrastructure/storage/S3.storage';
import { Readable } from 'stream';
import * as readline from 'readline';
import { TransactionEntity } from '../../../transaction/domain/entities/transaction.entity';
import CreateTransactionUseCase from '../../../transaction/application/use-cases/create-transaction.use-case';
import GetTransactionByIdUseCase from '../../../transaction/application/use-cases/get-transaction-by-id.use-case';
import ListCustomerUseCase from '../../../customer/application/use-cases/list-customer.use-case';
import CreateCustomerUseCase from '../../../customer/application/use-cases/create-customer.use-case';
import UpdateTransactionFileUseCase from '../../application/use-cases/update-transaction-file.use-case';
import { TransactionFileStatus } from '../../application/contracts/transaction-file-status.enum';
@Controller()
export default class ProcessTransactioCustomerController {
  constructor(
    private readonly s3Storage: S3Storage,
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getTransactionByIdUseCase: GetTransactionByIdUseCase,
    private readonly listCustomerUseCase: ListCustomerUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateTransactionFileUseCase: UpdateTransactionFileUseCase
  ) { }
  @EventPattern('process-transactions-queue')
  async handler(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.s3Storage.readFileInChunks(
        data.bucket, 
        data.key, 
        this.callbackData.bind(this), 
        this.callbackError.bind(this), 
        this.callbackEnd.bind(this, data),
        this.callbackInit.bind(this, data))
        channel.ack(originalMessage);
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
      this.callbackError(data);
      channel.nack(originalMessage);
    }
  }

  async callbackData(file: Buffer) {
    
    try {
      const readableStream = new Readable();
      readableStream.push(file);
      readableStream.push(null);

      const readLine = readline.createInterface({
        input: readableStream,
        crlfDelay: Infinity
      })

      for await (const line of readLine) {
        let transactionLine: {
          nome: string,
          id: string,
          cpfCnpj: string,
          data: string,
          valor: number
        } = {
          cpfCnpj: '',
          data: '',
          id: '',
          nome: '',
          valor: 0,
        };
        const attributes = line.split(';');

        for (let i = 0; i < attributes.length; i++) {
          const attribute = attributes[i];
          if (!attribute) break;
          const keyValue = attribute.split(':');
          transactionLine[keyValue[0]] = keyValue[1]
        }


        const transactionFound = await this.getTransactionByIdUseCase.execute(transactionLine.id);
        if (transactionFound) {
          return;
        }

        const customersFound = await this.listCustomerUseCase.execute({document: transactionLine.cpfCnpj});
        let customerId = customersFound.data?.[0]?._id;
        if(!customerId){
          customerId = (await this.createCustomerUseCase.execute({
            document: transactionLine.cpfCnpj,
            name: transactionLine.nome
          }))._id
        }


        const transactionCreate = new TransactionEntity();
        transactionCreate.customerId = customerId.toString();
        transactionCreate.date = transactionLine.data;
        transactionCreate.amount = transactionLine.valor;
        transactionCreate._id = transactionLine.id;
        await this.createTransactionUseCase.execute(transactionCreate)
      }
    } catch (error) {
      console.log(error);
    }
  }
  callbackError(data) {
    this.updateTransactionFileUseCase.execute(data.key, {
      status: TransactionFileStatus.ERROR
    })
  }

  callbackEnd(data){
    this.updateTransactionFileUseCase.execute(data.key, {
      status: TransactionFileStatus.FINISHED
    })
  }

  callbackInit(data){
    this.updateTransactionFileUseCase.execute(data.key, {
      status: TransactionFileStatus.FINISHED
    })
  }
}
