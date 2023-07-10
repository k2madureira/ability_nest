import { UpdateDto } from '@modules/observation/dto';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observation } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class UpdateObservationService {
  constructor(private prisma: PrismaService) {}

  async execute(
    id: string,
    body: UpdateDto.Body,
  ): Promise<Observation> {
    const observation =
      await this.prisma.observation.findFirst({
        where: {
          id,
          deletedAt: {
            not: true,
          },
        },
      });
    if (!observation) {
      throw new NotFoundException(NOT_FOUND('observation'));
    }

    return this.prisma.observation.update({
      where: { id },
      data: { ...body },
    });
  }
}
