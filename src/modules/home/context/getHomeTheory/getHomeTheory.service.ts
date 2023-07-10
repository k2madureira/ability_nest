import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';

import { User } from '@prisma/client';

@Injectable()
export class GetHomeTheoryService {
  constructor(private prisma: PrismaService) {}

  async execute(loggedUser: User): Promise<any> {
    const findUserInstrument =
      await this.prisma.user.findFirst({
        where: {
          deletedAt: { not: true },
          id: loggedUser.id,
        },
        select: {
          instrument: true,
        },
        take: Number.MAX_SAFE_INTEGER,
        skip: 0,
      });

    const instrument =
      findUserInstrument.instrument.name || '';

    return {
      description: instrument,
    };
  }
}
