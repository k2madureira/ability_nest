import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { ListDto } from '@modules/method/dto';

@Injectable()
export class GetMethodsService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(params: ListDto.Query): Promise<any> {
    const totalItems = await this.prisma.method.count({
      where: {
        deletedAt: {
          not: true,
        },
      },
    });

    const query = this.helper.queryBuild(params);

    const items = await this.prisma.method.findMany({
      ...query,
      include: {
        instrument: {
          select: { id: true, name: true },
        },
      },
    });

    return {
      totalItems,
      totalPage: Math.ceil(totalItems / params.perPage),
      items,
    };
  }
}
