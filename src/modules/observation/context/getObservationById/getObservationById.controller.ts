import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/observation/dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetObservationByIdService } from './getObservationById.service';

@ApiTags('Observations')
@UseGuards(JwtGuard, RolesGuard)
@Controller('observations')
export class GetObservationByIdController {
  constructor(
    private getObservationByIdService: GetObservationByIdService,
  ) {}

  @Get(':id')
  async getId(@Param() { id }: DefaultDto.pathParameter) {
    return this.getObservationByIdService.execute(id);
  }
}
