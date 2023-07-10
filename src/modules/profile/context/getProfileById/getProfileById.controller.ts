import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/profile/dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetProfileByIdService } from './getProfileById.service';

@ApiTags('Profiles')
@UseGuards(JwtGuard, RolesGuard)
@Controller('profiles')
export class GetProfileByIdController {
  constructor(
    private getProfileByIdService: GetProfileByIdService,
  ) {}

  @Get(':id')
  async getId(@Param() { id }: DefaultDto.pathParameter) {
    return this.getProfileByIdService.execute(id);
  }
}
