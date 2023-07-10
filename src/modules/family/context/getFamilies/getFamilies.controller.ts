import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/family/dto';
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetFamiliesService } from './getFamilies.service';

@ApiTags('Families')
@UseGuards(JwtGuard, RolesGuard)
@Controller('families')
export class GetFamiliesController {
  constructor(
    private getFamiliesService: GetFamiliesService,
  ) {}

  @Get()
  async getFamilies(@Query() query: ListDto.Query) {
    return this.getFamiliesService.execute(query);
  }
}
