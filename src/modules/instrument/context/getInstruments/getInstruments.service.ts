import { Injectable } from '@nestjs/common';

import { PrismaService } from '@shared/prisma/prisma.service';
import { HelperService } from '@shared/helper/helper.service';
import { ListDto } from '@modules/instrument/dto';
import { Instrument } from '@prisma/client';

interface IInstrumentList extends Instrument {
  totalStudents?: number;
  totalMethods?: number;
}
[];
@Injectable()
export class GetInstrumentsService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(params: ListDto.Query): Promise<any> {
    const query = this.helper.queryBuild(params);
    const items: any =
      await this.prisma.instrument.findMany({
        ...query,
        include: {
          _count: true,
          family: {
            select: {
              name: true,
            },
          },
        },
      });

    const instruments: IInstrumentList = items.map(
      (instrument) => {
        const {
          users: totalStudents,
          methods: totalMethods,
        } = instrument._count;

        delete instrument._count;
        return {
          ...instrument,
          totalStudents,
          totalMethods,
        };
      },
    );

    const totalItems = items.length;
    return {
      totalItems,
      totalPage: Math.ceil(totalItems / params.perPage),
      items: instruments,
    };
  }
}
