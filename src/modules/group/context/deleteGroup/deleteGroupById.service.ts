import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class DeleteGroupByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const group = await this.prisma.group.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!group) {
      throw new NotFoundException(NOT_FOUND('group'));
    }

    const data = {
      deletedAt: true,
    };

    await this.prisma.$transaction([
      this.prisma.userGroup.updateMany({
        where: {
          groupId: id,
        },
        data,
      }),
      this.prisma.group.update({
        where: {
          id,
        },
        data,
      }),
    ]);
  }
}
