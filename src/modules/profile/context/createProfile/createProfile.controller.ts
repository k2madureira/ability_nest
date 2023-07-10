import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { CreateDto } from '@modules/profile/dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileService } from './createProfile.service';

@ApiTags('Profiles')
@UseGuards(JwtGuard, RolesGuard)
@Controller('profiles')
export class CreateProfileController {
  constructor(
    private createProfileService: CreateProfileService,
  ) {}
  @Post()
  async create(@Body() body: CreateDto.Body) {
    return this.createProfileService.execute(body);
  }
}
