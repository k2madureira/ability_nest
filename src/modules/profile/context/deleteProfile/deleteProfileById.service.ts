import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  NOT_FOUND,
  NOT_ACCEPTABLE,
} from '@shared/helper/config/messages';

@Injectable()
export class DeleteProfileByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
      include: {
        users: true,
      },
    });
    if (!profile) {
      throw new NotFoundException(NOT_FOUND('profile'));
    }

    if (profile.users.length) {
      throw new NotAcceptableException(
        NOT_ACCEPTABLE('profile'),
      );
    }

    await this.prisma.profile.update({
      where: {
        id,
      },
      data: {
        deletedAt: true,
      },
    });
  }
}
