import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async forgotPassword(user: User, password: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'Ability-recuperação',
      subject: 'Senha temporária.',
      template: './forgotPassword',
      context: {
        name: user.firstName,
        password,
      },
    });
  }
}
