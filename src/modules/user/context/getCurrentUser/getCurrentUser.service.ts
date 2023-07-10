import { DefaultDto } from '@modules/user/dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class GetCurrentService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string): Promise<Partial<User>> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        ...DefaultDto.userSchema,
        instrument: true,
      },
    });
  }
}
