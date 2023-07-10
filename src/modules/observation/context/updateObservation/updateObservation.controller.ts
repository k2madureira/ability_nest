import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import {
  UpdateDto,
  DefaultDto,
} from '@modules/observation/dto';
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
import { UpdateObservationService } from './updateObservation.service';

@ApiTags('Observations')
@UseGuards(JwtGuard, RolesGuard)
@Controller('observations')
export class UpdateObservationController {
  constructor(
    private updateObservationService: UpdateObservationService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateObservation(
    @Param() { id }: DefaultDto.pathParameter,
    @Body() body: UpdateDto.Body,
  ) {
    return this.updateObservationService.execute(id, body);
  }
}
