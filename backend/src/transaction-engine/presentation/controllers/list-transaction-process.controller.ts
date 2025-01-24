import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ListTransactionsFileUseCase from '../../application/use-cases/list-transactions-file.use-case';
import ListTransactionsProcessDto from '../dtos/list-transactions-process.dto';

@Controller('transction-engine')
// @ApiBearerAuth('JWT')
@ApiTags('transaction-engine')
export default class ListTransactionProcessController {
  constructor(
    private readonly listTransactionFileUseCase: ListTransactionsFileUseCase
  ) {}

  @Get('/list-transaction-process')
  async handler(@Query() query: ListTransactionsProcessDto) {
    return await this.listTransactionFileUseCase.execute(query);
  }
}
