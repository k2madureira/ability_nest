import { UpdateDto } from '@modules/instrument/dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Instrument } from '@prisma/client';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';

@Injectable()
export class UpdateInstrumentService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(
    id: string,
    body: UpdateDto.Body,
  ): Promise<Instrument> {
    const instrument =
      await this.prisma.instrument.findMany({
        where: {
          id,
          deletedAt: {
            not: true,
          },
        },
      });
    if (instrument.length === 0) {
      throw new NotFoundException(NOT_FOUND('instrument'));
    }
    const slug = this.helper.slug(body.name);
    const conflict = await this.prisma.instrument.findFirst(
      {
        where: {
          slug,
          id: {
            not: id,
          },
        },
      },
    );

    if (conflict)
      throw new ConflictException(CONFLICT('instrument'));

    return this.prisma.instrument.update({
      where: { id },
      data: { ...body, slug },
    });
  }
}
