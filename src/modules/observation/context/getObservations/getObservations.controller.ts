import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/observation/dto';
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetObservationsService } from './getObservations.service';

@ApiTags('Observations')
@UseGuards(JwtGuard, RolesGuard)
@Controller('observations')
export class GetObservationsController {
  constructor(
    private getObservationsService: GetObservationsService,
  ) {}

  @Get()
  async getObservations(@Query() query: ListDto.Query) {
    return this.getObservationsService.execute(query);
  }
}
