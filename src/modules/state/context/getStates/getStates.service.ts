import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { ListDto } from '@modules/state/dto';

@Injectable()
export class GetStatesService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(params: ListDto.Query): Promise<any> {
    const totalItems = await this.prisma.state.count({
      where: {
        deletedAt: {
          not: true,
        },
      },
    });

    const query = this.helper.queryBuild(params);

    const items = await this.prisma.state.findMany({
      ...query,
    });

    return {
      totalItems,
      totalPage: Math.ceil(totalItems / params.perPage),
      items,
    };
  }
}
