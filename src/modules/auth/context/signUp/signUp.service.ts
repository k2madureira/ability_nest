import { SignUp } from '@modules/auth/dto';
import * as argon from 'argon2';
import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';
import { User } from '@prisma/client';
import { DefaultDto } from '@modules/user/dto';

@Injectable()
export class SignUpService {
  constructor(private prisma: PrismaService) {}

  async execute(
    dto: SignUp.Request,
  ): Promise<Partial<User>> {
    const [findUser, findProfile, findState, hash] =
      await Promise.all([
        this.prisma.user.findMany({
          where: {
            email: dto.email,
            deletedAt: {
              not: true,
            },
          },
        }),
        this.prisma.profile.findFirst({
          where: {
            slug: 'student',
          },
        }),
        this.prisma.state.findFirst({
          where: {
            id: dto.stateId,
          },
        }),
        argon.hash(dto.password),
      ]);

    if (findUser.length >= 1) {
      throw new ConflictException(CONFLICT('user'));
    } else if (!findState) {
      throw new NotFoundException(NOT_FOUND('state'));
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        firstName: dto.firstName,
        stateId: dto.stateId,
        profileId: findProfile.id,
        instrumentId: null,
      },
      select: { ...DefaultDto.userSchema },
    });

    return user;
  }
}
