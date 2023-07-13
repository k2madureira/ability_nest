import { ResetPassword } from '@modules/auth/dto';
import * as argon from 'argon2';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  INVALID_CREDENTIALS,
  DIFFERENT_PASSWORDS,
} from '@shared/helper/config/messages';
import { User } from '@prisma/client';

@Injectable()
export class ResetPasswordService {
  constructor(private prisma: PrismaService) {}

  async execute(
    dto: ResetPassword.Request,
    loggedUser: User,
  ): Promise<ResetPassword.Response> {
    const { oldPassword, password, passwordConfirmation } =
      dto;
    const user = await this.prisma.user.findFirst({
      where: {
        id: loggedUser.id,
        deletedAt: {
          not: true,
        },
      },
    });

    if (!user)
      throw new ForbiddenException(INVALID_CREDENTIALS);

    const passMatches = await argon.verify(
      user.hash,
      oldPassword,
    );
    if (!passMatches)
      throw new ForbiddenException(INVALID_CREDENTIALS);

    if (password !== passwordConfirmation) {
      throw new ConflictException(DIFFERENT_PASSWORDS);
    }

    const hash = await argon.hash(password.trim());

    await this.prisma.user.update({
      where: { id: loggedUser.id },
      data: { hash },
    });

    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.secondName || ''}`,
    };
  }
}
