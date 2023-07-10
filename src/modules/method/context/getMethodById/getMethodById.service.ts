import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Method } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class GetMethodByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Method> {
    const method = await this.prisma.method.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
      include: {
        instrument: {
          select: {
            id: true,
            name: true,
            slug: true,
            family: true,
          },
        },
      },
    });
    if (!method) {
      throw new NotFoundException(NOT_FOUND('method'));
    }

    return method;
  }
}
