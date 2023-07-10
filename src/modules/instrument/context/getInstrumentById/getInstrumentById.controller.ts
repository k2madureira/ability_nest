import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/instrument/dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetInstrumentByIdService } from './getInstrumentById.service';

@ApiTags('Instruments')
@UseGuards(JwtGuard, RolesGuard)
@Controller('instruments')
export class GetInstrumentByIdController {
  constructor(
    private getInstrumentByIdService: GetInstrumentByIdService,
  ) {}

  @Get(':id')
  async createInstrument(
    @Param() { id }: DefaultDto.pathParameter,
  ) {
    return this.getInstrumentByIdService.execute(id);
  }
}
