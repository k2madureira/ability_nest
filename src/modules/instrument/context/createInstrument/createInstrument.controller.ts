import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { CreateDto } from '@modules/instrument/dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateInstrumentService } from './createInstrument.service';

@ApiTags('Instruments')
@UseGuards(JwtGuard, RolesGuard)
@Controller('instruments')
export class CreateInstrumentController {
  constructor(
    private createInstrumentService: CreateInstrumentService,
  ) {}
  @Post()
  async createInstrument(@Body() body: CreateDto.Body) {
    return this.createInstrumentService.execute(body);
  }
}
