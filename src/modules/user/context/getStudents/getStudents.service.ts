import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';

import { ListDto } from '@modules/user/dto';
import { User } from '@prisma/client';

@Injectable()
export class GetStudentsService {
  constructor(private prisma: PrismaService) {}

  async execute(
    params: ListDto.Query,
    loggedUser: User,
  ): Promise<any> {
    const findGroups = await this.prisma.userGroup.findMany(
      {
        where: {
          instructor: true,
          userId: loggedUser.id,
        },
        select: {
          group: true,
        },
      },
    );

    const selectedGroupIds = findGroups.map(
      (data) => data.group.id,
    );

    const items = await this.prisma.user.findMany({
      where: {
        deletedAt: { not: true },
        userGroup: {
          some: {
            groupId: { in: selectedGroupIds },
            main: { equals: true },
          },
        },
        profile: {
          slug: {
            equals: 'student',
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        secondName: true,
        city: true,
        state: {
          select: {
            name: true,
            postal: true,
          },
        },
        instrument: true,
        userGroup: {
          select: {
            group: true,
            main: true,
          },
          where: {
            main: {
              equals: true,
            },
          },
        },
      },
      take: 10,
      skip: 0,
    });

    return {
      totalItems: items.length,
      totalPage: Math.ceil(items.length / params.perPage),
      items,
    };
  }
}
