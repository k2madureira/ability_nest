import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { DefaultDto, ListDto } from '@modules/user/dto';

@Injectable()
export class GetUsersService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(params: ListDto.Query): Promise<any> {
    const totalItems = await this.prisma.user.count({
      where: {
        deletedAt: {
          not: true,
        },
      },
    });

    const query = this.helper.queryBuild(params);

    const items = await this.prisma.user.findMany({
      ...query,
      select: {
        ...DefaultDto.userSchema,
        profile: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        state: {
          select: {
            id: true,
            name: true,
            slug: true,
            postal: true,
          },
        },
        userMethod: {
          ...this.prisma.methodSelect(),
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
