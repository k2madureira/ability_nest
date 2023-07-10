import { HttpException, Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { ListDto } from '@modules/observation/dto';

@Injectable()
export class GetObservationsService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(params: ListDto.Query): Promise<any> {
    const totalItems = await this.prisma.observation.count({
      where: {
        deletedAt: {
          not: true,
        },
      },
    });

    const query = this.helper.queryBuild(params);

    const selectField = {
      id: true,
      firstName: true,
    };
    const items = await this.prisma.observation.findMany({
      ...query,
      include: {
        replies: {
          select: {
            id: true,
            description: true,
          },
        },
        student: {
          select: selectField,
        },
        instructor: {
          select: selectField,
        },
      },
    });

    if (!items.length) {
      throw new HttpException('', 204);
    }

    const dateStr = 'dd-MM-yyyy HH:mm';
    const observations = items.map((observation) => ({
      ...observation,
      createdAt: format(observation.createdAt, dateStr),
      updatedAt: format(observation.updatedAt, dateStr),
    }));
    return {
      totalItems,
      totalPage: Math.ceil(totalItems / params.perPage),
      items: observations,
    };
  }
}
