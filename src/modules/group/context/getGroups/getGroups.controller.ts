import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/group/dto';
import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetGroupsService } from './getGroups.service';

@ApiTags('Groups')
@UseGuards(JwtGuard, RolesGuard)
@Controller('groups')
export class GetGroupsController {
  constructor(private getGroupsService: GetGroupsService) {}

  @Get()
  async getGroups(
    @Query() query: ListDto.Query,
    @Req() req: any,
  ) {
    const { user } = req;
    return this.getGroupsService.execute(query, user);
  }
}
