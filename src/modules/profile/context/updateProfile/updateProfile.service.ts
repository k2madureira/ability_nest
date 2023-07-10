import { UpdateDto } from '@modules/profile/dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';

@Injectable()
export class UpdateProfileService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(
    id: string,
    body: UpdateDto.Body,
  ): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!profile) {
      throw new NotFoundException(NOT_FOUND('profile'));
    }
    const slug = this.helper.slug(
      body.name || profile.name,
    );

    if (body.name) {
      const conflict = await this.prisma.profile.findFirst({
        where: {
          slug,
          id: {
            not: id,
          },
        },
      });

      if (conflict)
        throw new ConflictException(CONFLICT('profile'));
    }

    return this.prisma.profile.update({
      where: { id },
      data: { ...body, slug },
    });
  }
}
