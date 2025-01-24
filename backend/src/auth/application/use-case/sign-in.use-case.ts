import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = {
      name: 'joao',
      role: 'admin',
      password: 'admin',
      userId: '123',
      username: 'jodev',
    };
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
