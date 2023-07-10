import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/group/dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetGroupByIdService } from './getGroupById.service';

@ApiTags('Groups')
@UseGuards(JwtGuard, RolesGuard)
@Controller('groups')
export class GetGroupByIdController {
  constructor(
    private getGroupByIdService: GetGroupByIdService,
  ) {}

  @Get(':id')
  async getId(@Param() { id }: DefaultDto.pathParameter) {
    return this.getGroupByIdService.execute(id);
  }
}
