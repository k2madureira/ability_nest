import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class DeleteObservationByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const observation =
      await this.prisma.observation.findFirst({
        where: {
          id,
          deletedAt: {
            not: true,
          },
        },
      });
    if (!observation) {
      throw new NotFoundException(NOT_FOUND('observation'));
    }

    await this.prisma.observation.updateMany({
      where: {
        id,
      },
      data: { deletedAt: true },
    });
  }
}
