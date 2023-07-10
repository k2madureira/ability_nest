import { UpdateDto } from '@modules/family/dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Family } from '@prisma/client';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';

@Injectable()
export class UpdateFamilyService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(
    id: string,
    body: UpdateDto.Body,
  ): Promise<Family> {
    const family = await this.prisma.family.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!family) {
      throw new NotFoundException(NOT_FOUND('family'));
    }
    const slug = this.helper.slug(body.name || family.name);

    if (body.name) {
      const conflict = await this.prisma.family.findFirst({
        where: {
          slug,
          id: {
            not: id,
          },
        },
      });

      if (conflict)
        throw new ConflictException(CONFLICT('family'));
    }

    return this.prisma.family.update({
      where: { id },
      data: { ...body, slug },
    });
  }
}
