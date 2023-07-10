import { GetUser } from '@modules/auth/decorator';
import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentService } from './getCurrentUser.service';

@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@Controller('me')
export class GetCurrentUserController {
  constructor(
    private getCurrentService: GetCurrentService,
  ) {}

  @Get()
  async getCurrent(@GetUser() user: User) {
    return this.getCurrentService.execute(user.id);
  }
}
