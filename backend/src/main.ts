import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configFila = {
    url: 'amqp://guest:guest@host.docker.internal:5672?heartbeat=0',
    customerQueueName: 'transports-processing',
    noAck: false,
    customerPrefetchCount: 10,
  };

  const configSwagger = new DocumentBuilder()
    .setTitle('Zeztra')
    .setDescription('Api de transações')
    .setVersion('1.0.0')
    .addTag('transaction')
    .addTag('transaction-engine')
    .addTag('customer')
    .addTag('auth')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, documentFactory);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configFila.url],
      queue: configFila.customerQueueName,
      noAck: configFila.noAck,
      prefetchCount: configFila.customerPrefetchCount,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
