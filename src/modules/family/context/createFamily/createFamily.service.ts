import { CreateDto } from '@modules/family/dto';
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Family } from '@prisma/client';
import { CONFLICT } from '@shared/helper/config/messages';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class CreateFamilyService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(body: CreateDto.Body): Promise<Family> {
    const slug = this.helper.slug(body.name);
    const findFamily = await this.prisma.family.findFirst({
      where: {
        slug,
      },
    });

    if (findFamily)
      throw new ConflictException(CONFLICT('family'));

    return this.prisma.family.create({
      data: { name: body.name.trim(), slug },
    });
  }
}
