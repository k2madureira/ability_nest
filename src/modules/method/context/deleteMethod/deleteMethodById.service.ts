import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class DeleteMethodByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const method = await this.prisma.method.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!method) {
      throw new NotFoundException(NOT_FOUND('method'));
    }

    const data = {
      deletedAt: true,
    };
    this.prisma.$transaction([
      this.prisma.userMethod.updateMany({
        where: {
          methodId: id,
        },
        data,
      }),
      this.prisma.method.update({
        where: {
          id,
        },
        data,
      }),
    ]);
  }
}
