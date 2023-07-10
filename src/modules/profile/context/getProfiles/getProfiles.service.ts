import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { ListDto } from '@modules/profile/dto';

@Injectable()
export class GetProfilesService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(params: ListDto.Query): Promise<any> {
    const totalItems = await this.prisma.profile.count({
      where: {
        deletedAt: {
          not: true,
        },
      },
    });

    const query = this.helper.queryBuild(params);

    const items = await this.prisma.profile.findMany({
      ...query,
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            email: true,
          },
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
