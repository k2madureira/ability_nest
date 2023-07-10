import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { StatusDto } from '@modules/home/dto';
import {
  Get,
  Controller,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetHomeStatusService } from './getHomeStatus.service';

@ApiTags('Home')
@UseGuards(JwtGuard, RolesGuard)
@Controller('home')
export class GetHomeStatusController {
  constructor(
    private getHomeStatusService: GetHomeStatusService,
  ) {}
  @Get()
  async getStudents(
    @Query() query: StatusDto.Query,
    @Req() req: any,
  ) {
    const { user } = req;

    return this.getHomeStatusService.execute(query, user);
  }
}
