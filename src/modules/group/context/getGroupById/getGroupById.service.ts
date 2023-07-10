import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Group } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class GetGroupByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Group> {
    const group = await this.prisma.group.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
      include: {
        groupUsers: {
          select: {
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
    if (!group) {
      throw new NotFoundException(NOT_FOUND('group'));
    }

    return group;
  }
}
