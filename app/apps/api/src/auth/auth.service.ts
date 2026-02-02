import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
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
  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
