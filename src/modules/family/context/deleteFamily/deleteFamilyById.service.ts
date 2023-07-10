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
export class DeleteFamilyByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const family = await this.prisma.family.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
      include: {
        instruments: true,
      },
    });
    if (!family) {
      throw new NotFoundException(NOT_FOUND('family'));
    }

    if (family.instruments.length) {
      throw new NotAcceptableException(
        NOT_ACCEPTABLE('family'),
      );
    }

    await this.prisma.family.update({
      where: {
        id,
      },
      data: {
        deletedAt: true,
      },
    });
  }
}
