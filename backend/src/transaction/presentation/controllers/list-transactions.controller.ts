import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ListTransactionUseCase from '../../application/use-cases/list-transaction.use-case';
import ListTransactionsDto from '../dtos/list-transactions.dto';

@ApiTags('transaction')
@Controller('transactions')
export default class ListTransactionsController {
  constructor(
    private readonly listTransactionsUseCase: ListTransactionUseCase,
  ) {}

  @Get('')
  // @ApiBearerAuth('JWT')
  handler(@Query() query: ListTransactionsDto) {
    return this.listTransactionsUseCase.execute(query);
  }
}
