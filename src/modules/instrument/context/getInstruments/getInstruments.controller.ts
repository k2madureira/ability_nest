import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/instrument/dto';
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetInstrumentsService } from './getInstruments.service';

@ApiTags('Instruments')
@UseGuards(JwtGuard, RolesGuard)
@Controller('instruments')
export class GetInstrumentsController {
  constructor(
    private getInstrumentsService: GetInstrumentsService,
  ) {}

  @Get()
  async createInstrument(@Query() query: ListDto.Query) {
    return this.getInstrumentsService.execute(query);
  }
}
