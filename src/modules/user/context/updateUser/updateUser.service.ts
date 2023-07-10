import { UpdateDto, DefaultDto } from '@modules/user/dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';
import {
  CONFLICT,
  NOT_FOUND,
} from '@shared/helper/config/messages';
import { HelperService } from '@shared/helper/helper.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private prisma: PrismaService,
    private helper: HelperService,
  ) {}

  async execute(
    id: string,
    body: UpdateDto.Body,
  ): Promise<Partial<User>> {
    const { methods, ...data } = body;
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: {
          not: true,
        },
      },
    });
    if (!user) {
      throw new NotFoundException(NOT_FOUND('user'));
    }

    if (data.email) {
      const email = data.email.trim();
      const conflict = await this.prisma.user.findFirst({
        where: {
          email,
          id: {
            not: id,
          },
        },
      });

      if (conflict)
        throw new ConflictException(CONFLICT('email'));
    }

    if (methods) {
      const userMethod = this.prisma.userMethod;
      const findUserMethods = await userMethod.findMany({
        where: {
          studentId: id,
          deletedAt: {
            not: true,
          },
        },
      });
      const selectedIds = methods.map((i) => i.methodId);
      const bdIds = findUserMethods.map((i) => i.methodId);
      const allIds = this.helper.arrayUnique(
        selectedIds.concat(bdIds),
      );

      for (const methodId of allIds) {
        const findCurrent = methods.find(
          (i) => i.methodId === methodId,
        );
        const findStored = findUserMethods.find(
          (i) => i.methodId === methodId,
        );

        const where = {
          methodId,
          userId: id,
        };

        if (findStored && !findCurrent) {
          await userMethod.updateMany({
            where,
            data: {
              deletedAt: true,
              main: false,
            },
          });
        } else if (findStored && findCurrent) {
          await userMethod.updateMany({
            where,
            data: {
              main: findCurrent.main,
              lesson: findCurrent.lesson,
            },
          });
        } else if (!findStored && findCurrent) {
          await userMethod.createMany({
            data: {
              methodId,
              studentId: id,
              main: findCurrent.main,
              lesson: findCurrent.lesson,
            },
          });
        }
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      } as Partial<User>,
      select: { ...DefaultDto.userSchema },
    });
  }
}
