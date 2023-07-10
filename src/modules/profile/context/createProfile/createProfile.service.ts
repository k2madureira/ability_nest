import { CreateDto } from '@modules/profile/dto';
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { CONFLICT } from '@shared/helper/config/messages';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class CreateProfileService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(body: CreateDto.Body): Promise<Profile> {
    const slug = this.helper.slug(body.name);
    const findProfile = await this.prisma.profile.findFirst(
      {
        where: {
          slug,
        },
      },
    );

    if (findProfile)
      throw new ConflictException(CONFLICT('profile'));

    return this.prisma.profile.create({
      data: { name: body.name.trim(), slug },
    });
  }
}
