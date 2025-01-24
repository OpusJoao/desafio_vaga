import { Module } from '@nestjs/common';
import TransactionModule from './transaction/transaction.module';
import AuthModule from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/presentation/guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import TranscationEngineModule from './transaction-engine/transaction-engine.module';
import SharedModule from './shared/shared.module';
import CustomerModule from './customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://host.docker.internal/nest'),
    TransactionModule,
    AuthModule,
    TranscationEngineModule,
    SharedModule,
    CustomerModule
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
