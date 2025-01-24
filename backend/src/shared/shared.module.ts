import { Module } from '@nestjs/common';
import { S3Storage } from './infrastructure/storage/S3.storage';

@Module({
  providers: [
    S3Storage
  ],
  exports:[
    S3Storage,
  ]
})
export default class SharedModule {}
