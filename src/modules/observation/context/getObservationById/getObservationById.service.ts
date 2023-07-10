import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observation } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class GetObservationByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Observation> {
    const selectField = {
      id: true,
      firstName: true,
      email: true,
      city: true,
    };
    const observation =
      await this.prisma.observation.findFirst({
        where: {
          id,
          deletedAt: {
            not: true,
          },
        },
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
    if (!observation) {
      throw new NotFoundException(NOT_FOUND('observation'));
    }

    return observation;
  }
}
