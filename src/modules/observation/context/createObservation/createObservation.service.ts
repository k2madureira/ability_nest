import { CreateDto } from '@modules/observation/dto';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observation } from '@prisma/client';
import { NOT_FOUND } from '@shared/helper/config/messages';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class CreateObservationService {
  constructor(private prisma: PrismaService) {}

  async execute(
    body: CreateDto.Body,
  ): Promise<Observation> {
    const { instructorId, studentId, replyFromId } = body;
    const promises: Promise<any>[] = [
      this.prisma.user.findFirst({
        where: { id: instructorId },
      }),
      this.prisma.user.findFirst({
        where: { id: studentId },
      }),
    ];

    if (replyFromId) {
      promises.push(
        this.prisma.observation.findFirst({
          where: {
            id: replyFromId,
          },
        }),
      );
    }

    const [instructor, student, observation] =
      await Promise.all(promises);

    if (!instructor || !student) {
      throw new NotFoundException(
        NOT_FOUND(
          `user-${!instructor ? instructorId : studentId}`,
        ),
      );
    } else if (replyFromId && !observation) {
      throw new NotFoundException(NOT_FOUND(`observation`));
    }

    return this.prisma.observation.create({
      data: {
        ...body,
      },
    });
  }
}
