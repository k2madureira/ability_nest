import { CreateDto } from '@modules/instrument/dto';
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Instrument } from '@prisma/client';
import { CONFLICT } from '@shared/helper/config/messages';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class CreateInstrumentService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(body: CreateDto.Body): Promise<Instrument> {
    const slug = this.helper.slug(body.name);
    const findInstrument =
      await this.prisma.instrument.findFirst({
        where: {
          slug,
        },
      });

    if (findInstrument)
      throw new ConflictException(CONFLICT('instrument'));

    return this.prisma.instrument.create({
      data: { ...body, slug },
    });
  }
}
