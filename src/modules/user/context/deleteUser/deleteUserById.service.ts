import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class DeleteUserByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!user) {
      throw new NotFoundException(NOT_FOUND('user'));
    }

    const data = {
      deletedAt: true,
    };
    this.prisma.$transaction([
      this.prisma.userMethod.updateMany({
        where: {
          studentId: id,
        },
        data,
      }),
      this.prisma.user.update({
        where: {
          id,
        },
        data,
      }),
    ]);
  }
}
