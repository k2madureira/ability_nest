import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { CreateDto } from '@modules/group/dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupService } from './createGroup.service';

@ApiTags('Groups')
@UseGuards(JwtGuard, RolesGuard)
@Controller('groups')
export class CreateGroupController {
  constructor(
    private createGroupService: CreateGroupService,
  ) {}
  @Post()
  async create(@Body() body: CreateDto.Body) {
    return this.createGroupService.execute(body);
  }
}
