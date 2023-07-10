import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { ListDto } from '@modules/group/dto';
import { Group, User } from '@prisma/client';

interface IGroupList extends Group {
  totalStudents?: number;
}
[];

@Injectable()
export class GetGroupsService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(
    params: ListDto.Query,
    loggedUser: User,
  ): Promise<any> {
    const { isLogged, ...queryStringParams } = params;
    const findGroups = await this.prisma.userGroup.findMany(
      {
        where: isLogged
          ? {
              instructor: true,
              userId: loggedUser.id,
            }
          : {},
        select: {
          group: true,
        },
      },
    );

    const selectedGroupIds = findGroups.map(
      (data) => data.group.id,
    );

    const query = this.helper.queryBuild(queryStringParams);

    const items: any = await this.prisma.group.findMany({
      ...query,
      where: {
        ...query.where,
        groupUsers: isLogged
          ? {
              some: {
                groupId: { in: selectedGroupIds },
              },
            }
          : {},
      },
      include: {
        _count: true,
        groupUsers: {
          select: {
            instructor: true,
            userId: true,
            user: {
              select: {
                id: true,
                firstName: true,
                city: true,
              },
            },
          },
        },
      },
    });

    const groups: IGroupList = items.map((group) => {
      const totalStudents = group._count.groupUsers - 1;
      delete group._count;
      return {
        ...group,
        totalStudents,
      };
    });

    const totalItems = selectedGroupIds.length;
    return {
      totalItems,
      totalPage: Math.ceil(totalItems / params.perPage),
      items: groups,
    };
  }
}
