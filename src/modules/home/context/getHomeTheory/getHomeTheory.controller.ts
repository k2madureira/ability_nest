import { JwtGuard, RolesGuard } from '@modules/auth/guard';

import {
  Get,
  Controller,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetHomeTheoryService } from './getHomeTheory.service';

@ApiTags('Home')
@UseGuards(JwtGuard, RolesGuard)
@Controller('theory')
export class GetHomeTheoryController {
  constructor(
    private getHomeTheoryService: GetHomeTheoryService,
  ) {}
  @Get()
  async getStudents(@Req() req: any) {
    const { user } = req;

    return this.getHomeTheoryService.execute(user);
  }
}
