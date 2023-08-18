import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // 1. Fetch user with email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // throw error when no user is found
    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    // 2. check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // throw error when password not match
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password.');

    // 3. Generate JWT and return
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
