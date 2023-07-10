import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Instrument } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class GetInstrumentByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Instrument> {
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

    return instrument[0];
  }
}
