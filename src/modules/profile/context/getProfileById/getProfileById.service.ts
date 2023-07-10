import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';

@Injectable()
export class GetProfileByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            secondName: true,
            email: true,
            urlImage: true,
          },
        },
      },
    });
    if (!profile) {
      throw new NotFoundException(NOT_FOUND('profile'));
    }

    return profile;
  }
}
