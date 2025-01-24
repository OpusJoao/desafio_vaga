import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ListCustomerUseCase from '../../application/use-cases/list-customer.use-case';
import ListCustomersDto from '../dtos/list-customers.dto';

@ApiTags('customer')
@Controller('customers')
export default class ListCustomersController {
  constructor(
    private readonly listCustomersUseCase: ListCustomerUseCase,
  ) {}

  @Get('')
  // @ApiBearerAuth('JWT')
  handler(@Query() query: ListCustomersDto) {
    return this.listCustomersUseCase.execute(query);
  }
}
