import { ForgotPassword } from '@modules/auth/dto';
import * as argon from 'argon2';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';
import { EmailService } from '@shared/mailer/mail.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private prisma: PrismaService,
    private mailer: EmailService,
  ) {}

  async execute(
    dto: ForgotPassword.Request,
  ): Promise<ForgotPassword.Response> {
    const { email } = dto;
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: {
          not: true,
        },
      },
    });

    if (!user)
      throw new NotFoundException(NOT_FOUND('user'));

    const password = Math.random().toString(36).slice(-8);
    const hash = await argon.hash(password.trim());

    await this.mailer.forgotPassword(user, password);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { hash },
    });

    return {
      email: user.email,
    };
  }
}
