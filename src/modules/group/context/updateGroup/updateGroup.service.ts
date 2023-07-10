import { UpdateDto } from '@modules/group/dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Group } from '@prisma/client';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';

@Injectable()
export class UpdateGroupService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(
    id: string,
    body: UpdateDto.Body,
  ): Promise<Group> {
    const group = await this.prisma.group.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!group) {
      throw new NotFoundException(NOT_FOUND('group'));
    }
    const slug = this.helper.slug(body.name || group.name);

    if (body.name) {
      const conflict = await this.prisma.group.findFirst({
        where: {
          slug,
          id: {
            not: id,
          },
        },
      });

      if (conflict)
        throw new ConflictException(CONFLICT('group'));
    }

    return this.prisma.group.update({
      where: { id },
      data: { ...body, slug },
    });
  }
}
