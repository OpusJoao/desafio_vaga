import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerEntity } from '../../domain/entities/customer.entity';

export interface DataListCustomersInterface{
  document?: string;
  limit?: number;
  page?: number;
}

@Injectable()
export default class ListCustomerUseCase {
  constructor(
    @InjectModel(CustomerEntity.name)
    private customerModel: Model<CustomerEntity>,
  ) {}

  async execute(dataQuery: DataListCustomersInterface) {
    dataQuery.page = dataQuery.page || 1;
    dataQuery.limit = dataQuery.limit || 10;
    const skip = (dataQuery.page - 1) * dataQuery.limit;
    const filter = this.generateFilter(dataQuery);
    const data = await this.customerModel.find(filter).skip(skip).limit(dataQuery.limit).exec();
    const total = await this.customerModel.countDocuments().exec();

    return {
      data,
      currentPage: dataQuery.page,
      totalPages: Math.ceil(total / dataQuery.limit),
      totalItems: total,
    };
  }

  generateFilter(dataQuery: DataListCustomersInterface){
    let filter: CustomerEntity = new CustomerEntity();

    if(dataQuery.document){
      filter.document = dataQuery.document;
    }

    return filter;
  }
}
