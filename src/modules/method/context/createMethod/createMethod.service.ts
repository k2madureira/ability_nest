import { CreateDto } from '@modules/method/dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Method } from '@prisma/client';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class CreateMethodService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(body: CreateDto.Body): Promise<Method> {
    const slug = this.helper.slug(body.title);
    const findMethod = await this.prisma.method.findFirst({
      where: {
        slug,
      },
    });

    if (findMethod)
      throw new ConflictException(CONFLICT('method'));

    if (body.instrumentId) {
      const instrument =
        await this.prisma.instrument.findFirst({
          where: {
            id: body.instrumentId,
            deletedAt: {
              not: true,
            },
          },
        });

      if (!instrument) {
        throw new NotFoundException(
          NOT_FOUND('instrument'),
        );
      }
    }

    return this.prisma.method.create({
      data: { ...body, slug },
    });
  }
}
