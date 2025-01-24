import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerEntity } from '../../domain/entities/customer.entity';

@Injectable()
export default class CreateCustomerUseCase {
  constructor(
    @InjectModel(CustomerEntity.name)
    private customerModel: Model<CustomerEntity>,
  ) {}
  async execute(customerDto) {
    const createdCustomer = new this.customerModel(customerDto);

    return createdCustomer.save();
  }
}
