import * as argon from 'argon2';
import { CreateDto, DefaultDto } from '@modules/user/dto';
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CONFLICT } from '@shared/helper/config/messages';
import { PrismaService } from '@shared/prisma/prisma.service';
import { EmailService } from '@shared/mailer/mail.service';

@Injectable()
export class CreateUserService {
  constructor(
    private prisma: PrismaService,
    private mailer: EmailService,
  ) {}

  async execute(
    body: CreateDto.UserRequest,
  ): Promise<Partial<User>> {
    const { methods, groups, ...data } = body;

    const password = Math.random().toString(36).slice(-8);
    const hash = await argon.hash(password);

    const findUser = await this.prisma.user.findFirst({
      where: {
        email: data.email.trim(),
      },
    });

    if (findUser)
      throw new ConflictException(CONFLICT('user'));

    const user: any = await this.prisma.user.create({
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

    await this.mailer.tempPassword(user, password);

    return user;
  }
}
