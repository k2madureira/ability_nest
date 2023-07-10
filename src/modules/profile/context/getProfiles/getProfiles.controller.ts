import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/profile/dto';
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetProfilesService } from './getProfiles.service';

@ApiTags('Profiles')
@UseGuards(JwtGuard, RolesGuard)
@Controller('profiles')
export class GetProfilesController {
  constructor(
    private getProfilesService: GetProfilesService,
  ) {}

  @Get()
  async getProfiles(@Query() query: ListDto.Query) {
    return this.getProfilesService.execute(query);
  }
}
