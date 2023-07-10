import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { CreateDto } from '@modules/observation/dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateObservationService } from './createObservation.service';

@ApiTags('Observations')
@UseGuards(JwtGuard, RolesGuard)
@Controller('observations')
export class CreateObservationController {
  constructor(
    private createObservationService: CreateObservationService,
  ) {}
  @Post()
  async create(@Body() body: CreateDto.Body) {
    return this.createObservationService.execute(body);
  }
}
