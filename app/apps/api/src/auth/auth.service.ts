import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async validateLocalUSer({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user || !user.password)
      throw new UnauthorizedException('Invalid credentials');
    const passwordMatch = await verify(user.password, password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
