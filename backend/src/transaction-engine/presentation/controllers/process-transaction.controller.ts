import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PassThrough } from 'stream';
import { S3Storage } from '../../../shared/infrastructure/storage/S3.storage';
import CreateTransactionFileUseCase from '../../application/use-cases/create-transaction-file.use-case';
import { TransactionFileStatus } from '../../application/contracts/transaction-file-status.enum';

@Controller('transction-engine')
// @ApiBearerAuth('JWT')
@ApiTags('transaction-engine')
export default class ProcessTransactionController {
  constructor(
    @Inject('TRANSACTION_ENGINE_SERVICE')
    private readonly client: ClientProxy,
    private readonly s3Storage: S3Storage,
    private readonly createTransactionFileUseCase: CreateTransactionFileUseCase
  ) {}

  @Post('/process-transactions')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async handler(@UploadedFile() file: Express.Multer.File) {
    const fileUploaded = await this.s3Storage.uploadFile(file.buffer, file.originalname);
    this.client.emit('process-transactions-queue', {
      userId: '1',
      ...fileUploaded
    });

    this.createTransactionFileUseCase.execute({
      name: fileUploaded.key,
      size: file.size,
      status: TransactionFileStatus.UPLOADED,
      startDate: new Date(Date.now())
    })
  }
}
