import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerEntity, CustomerSchema } from "./domain/entities/customer.entity";
import ListCustomersController from "./presentation/controllers/list-customers.controller";
import ListCustomerUseCase from "./application/use-cases/list-customer.use-case";
import CreateCustomerUseCase from "./application/use-cases/create-customer.use-case";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: CustomerEntity.name, schema: CustomerSchema },
        ]),
    ],
    controllers: [
        ListCustomersController
    ],
    providers: [
        ListCustomerUseCase,
        CreateCustomerUseCase,
    ],
    exports: [
        ListCustomerUseCase,
        CreateCustomerUseCase,
    ]
})
export default class CustomerModule { }