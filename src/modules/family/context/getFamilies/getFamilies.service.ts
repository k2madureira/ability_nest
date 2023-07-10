import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { ListDto } from '@modules/family/dto';
import { Family } from '@prisma/client';

interface IFamilyList extends Family {
  totalInstruments?: number;
}
[];

@Injectable()
export class GetFamiliesService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(params: ListDto.Query): Promise<any> {
    const query = this.helper.queryBuild(params);

    const items: any = await this.prisma.family.findMany({
      ...query,
      include: {
        _count: true,
        instruments: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const families: IFamilyList = items.map((family) => {
      const totalInstruments = family._count.instruments;
      delete family._count;
      return {
        ...family,
        totalInstruments,
      };
    });

    const totalItems = items.length;
    return {
      totalItems,
      totalPage: Math.ceil(totalItems / params.perPage),
      items: families,
    };
  }
}
