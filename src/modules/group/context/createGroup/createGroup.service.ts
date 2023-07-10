import { CreateDto } from '@modules/group/dto';
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Group } from '@prisma/client';
import { CONFLICT } from '@shared/helper/config/messages';
import { HelperService } from '@shared/helper/helper.service';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class CreateGroupService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(body: CreateDto.Body): Promise<Group> {
    const { name, users } = body;
    const slug = this.helper.slug(name);
    const findGroup = await this.prisma.group.findFirst({
      where: {
        slug,
      },
    });

    if (findGroup)
      throw new ConflictException(CONFLICT('group'));

    return this.prisma.group.create({
      data: {
        name: name.trim(),
        slug,
        groupUsers: {
          createMany: {
            data: users || [],
          },
        },
      },
    });
  }
}
