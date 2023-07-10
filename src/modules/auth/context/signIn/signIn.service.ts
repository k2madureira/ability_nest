import { SignIn } from '@modules/auth/dto';
import * as argon from 'argon2';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { INVALID_CREDENTIALS } from '@shared/helper/config/messages';

@Injectable()
export class SignInService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async execute(
    dto: SignIn.Request,
  ): Promise<SignIn.Response> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
        deletedAt: {
          not: true,
        },
      },
      include: {
        profile: true,
        instrument: true,
      },
    });

    if (!user)
      throw new ForbiddenException(INVALID_CREDENTIALS);

    const passMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    if (!passMatches)
      throw new ForbiddenException(INVALID_CREDENTIALS);

    const token = await this.signToken(user.id, user.email);
    return {
      ...token,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.secondName || ''}`,
        profile: user.profile,
        instrument: user.instrument,
      },
    };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<SignIn.Response> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
