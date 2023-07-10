import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { UpdateDto, DefaultDto } from '@modules/family/dto';
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
import { UpdateFamilyService } from './updateFamily.service';

@ApiTags('Families')
@UseGuards(JwtGuard, RolesGuard)
@Controller('families')
export class UpdateFamilyController {
  constructor(
    private updateFamilyService: UpdateFamilyService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateFamily(
    @Param() { id }: DefaultDto.pathParameter,
    @Body() body: UpdateDto.Body,
  ) {
    return this.updateFamilyService.execute(id, body);
  }
}
