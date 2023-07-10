import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  methodSelect(): any {
    return {
      where: {
        deletedAt: {
          not: true,
        },
        main: true,
      },
      select: {
        lesson: true,
        method: {
          select: {
            id: true,
            title: true,
            instrument: {
              select: {
                id: true,
                name: true,
                family: true,
              },
            },
          },
        },
      },
    };
  }

  cleanDb() {
    return this.$transaction([
      this.userMethod.deleteMany(),
      this.user.deleteMany(),
      this.method.deleteMany(),
      this.instrument.deleteMany(),
    ]);
  }
}
