import * as argon from 'argon2';
import { CreateDto, DefaultDto } from '@modules/user/dto';
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CONFLICT } from '@shared/helper/config/messages';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class CreateUserService {
  constructor(private prisma: PrismaService) {}

  async execute(
    body: CreateDto.UserRequest,
  ): Promise<Partial<User>> {
    const { password, methods, groups, ...data } = body;

    const hash = await argon.hash(password);

    const findUser = await this.prisma.user.findFirst({
      where: {
        email: data.email.trim(),
      },
    });

    if (findUser)
      throw new ConflictException(CONFLICT('user'));

    const user = await this.prisma.user.create({
      data: {
        ...data,
        hash,
        userMethod: {
          createMany: {
            data: methods || [],
          },
        },
        userGroup: {
          createMany: {
            data: groups || [],
          },
        },
      },
      select: { ...DefaultDto.userSchema },
    });

    return user;
  }
}
