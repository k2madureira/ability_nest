import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import { NOT_FOUND } from '@shared/helper/config/messages';
import { DefaultDto } from '@modules/user/dto';

@Injectable()
export class GetUserByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Partial<User>> {
    const selectAll = this.prisma.methodSelect();
    delete selectAll.where.main;

    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
      select: {
        ...DefaultDto.userSchema,
        userGroup: {
          ...selectAll,
        },
      },
    });
    if (!user) {
      throw new NotFoundException(NOT_FOUND('user'));
    }

    return user;
  }
}
