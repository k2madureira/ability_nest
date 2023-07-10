import { UpdateDto } from '@modules/method/dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Method } from '@prisma/client';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';

@Injectable()
export class UpdateMethodService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(
    id: string,
    body: UpdateDto.Body,
  ): Promise<Method> {
    const method = await this.prisma.method.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!method) {
      throw new NotFoundException(NOT_FOUND('method'));
    }
    const slug = this.helper.slug(body.title);
    const conflict = await this.prisma.method.findFirst({
      where: {
        slug,
        id: {
          not: id,
        },
      },
    });

    if (conflict)
      throw new ConflictException(CONFLICT('method'));

    return this.prisma.method.update({
      where: { id },
      data: { ...body, slug },
    });
  }
}
