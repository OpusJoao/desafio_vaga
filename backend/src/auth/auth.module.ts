import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import SignInController from './presentation/controllers/sign-in.controller';
import { SignInUseCase } from './application/use-case/sign-in.use-case';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [SignInController],
  providers: [SignInUseCase],
})
export default class AuthModule {}
