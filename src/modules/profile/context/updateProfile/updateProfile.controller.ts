import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import {
  UpdateDto,
  DefaultDto,
} from '@modules/profile/dto';
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
import { UpdateProfileService } from './updateProfile.service';

@ApiTags('Profiles')
@UseGuards(JwtGuard, RolesGuard)
@Controller('profiles')
export class UpdateProfileController {
  constructor(
    private updateProfileService: UpdateProfileService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Param() { id }: DefaultDto.pathParameter,
    @Body() body: UpdateDto.Body,
  ) {
    return this.updateProfileService.execute(id, body);
  }
}
