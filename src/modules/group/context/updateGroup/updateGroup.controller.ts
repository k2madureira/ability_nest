import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { UpdateDto, DefaultDto } from '@modules/group/dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateGroupService } from './updateGroup.service';

@ApiTags('Groups')
@UseGuards(JwtGuard, RolesGuard)
@Controller('groups')
export class UpdateGroupController {
  constructor(
    private updateGroupService: UpdateGroupService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateGroup(
    @Param() { id }: DefaultDto.pathParameter,
    @Body() body: UpdateDto.Body,
  ) {
    return this.updateGroupService.execute(id, body);
  }
}
