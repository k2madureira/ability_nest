import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/user/dto';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { GetStudentsService } from './getStudents.service';

@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@Controller('students')
export class GetStudentsController {
  constructor(
    private getStudentsService: GetStudentsService,
  ) {}

  @Get()
  async getStudents(
    @Query() query: ListDto.Query,
    @Req() req: any,
  ) {
    const { user } = req;

    return this.getStudentsService.execute(query, user);
  }
}
