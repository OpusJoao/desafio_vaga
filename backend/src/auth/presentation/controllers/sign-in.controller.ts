import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from '../../application/use-case/sign-in.use-case';
import { Public } from '../decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export default class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  @Public()
  @Post('/signIn')
  signIn() {
    return this.signInUseCase.execute('', 'admin');
  }
}
