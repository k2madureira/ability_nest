import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class DeleteInstrumentByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const instrument =
      await this.prisma.instrument.findMany({
        where: {
          id,
          deletedAt: {
            not: true,
          },
        },
      });
    if (instrument.length === 0) {
      throw new NotFoundException(NOT_FOUND('instrument'));
    }

    this.prisma.$transaction([
      this.prisma.method.updateMany({
        where: {
          instrumentId: id,
        },
        data: {
          instrumentId: null,
        },
      }),
      this.prisma.instrument.update({
        where: {
          id,
        },
        data: {
          deletedAt: true,
        },
      }),
    ]);
  }
}
