import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Family } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class GetFamilyByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Family> {
    const family = await this.prisma.family.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
      include: {
        instruments: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!family) {
      throw new NotFoundException(NOT_FOUND('family'));
    }

    return family;
  }
}
