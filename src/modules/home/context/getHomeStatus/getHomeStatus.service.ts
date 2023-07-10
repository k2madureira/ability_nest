import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';

import { StatusDto } from '@modules/home/dto';
import { User } from '@prisma/client';

@Injectable()
export class GetHomeStatusService {
  constructor(private prisma: PrismaService) {}

  async execute(
    params: StatusDto.Query,
    loggedUser: User,
  ): Promise<any> {
    const findGroups = await this.prisma.userGroup.findMany(
      {
        where: {
          deletedAt: { not: true },
          instructor: true,
          userId: loggedUser.id,
        },
        select: {
          group: true,
        },
        take: Number.MAX_SAFE_INTEGER,
        skip: 0,
      },
    );

    const selectedGroupIds = findGroups.map(
      (data) => data.group.id,
    );

    const [students, instruments, families] =
      await Promise.all([
        this.prisma.user.findMany({
          where: {
            deletedAt: { not: true },
            userGroup: {
              some: {
                groupId: { in: selectedGroupIds },
              },
            },
            profile: {
              slug: {
                equals: 'student',
              },
            },
            userMethod: {
              every: {
                main: {
                  equals: true,
                },
              },
            },
          },
          select: {
            id: true,
            firstName: true,
          },
          take: Number.MAX_SAFE_INTEGER,
          skip: 0,
        }),
        this.prisma.instrument.findMany({
          where: {
            deletedAt: { not: true },
          },
          select: {
            id: true,
          },
          take: 20,
          skip: 0,
        }),
        this.prisma.family.findMany({
          where: {
            deletedAt: { not: true },
          },
          select: {
            id: true,
          },
          take: 10,
          skip: 0,
        }),
      ]);

    return {
      groups: selectedGroupIds.length,
      students: students.length,
      instruments: instruments.length,
      naipes: families.length,
      set: [
        selectedGroupIds.length,
        students.length,
        instruments.length,
        families.length,
      ],
    };
  }
}
