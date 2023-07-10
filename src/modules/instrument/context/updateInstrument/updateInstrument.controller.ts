import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import {
  UpdateDto,
  DefaultDto,
} from '@modules/instrument/dto';
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
import { UpdateInstrumentService } from './updateInstrument.service';

@ApiTags('Instruments')
@UseGuards(JwtGuard, RolesGuard)
@Controller('instruments')
export class UpdateInstrumentController {
  constructor(
    private updateInstrumentService: UpdateInstrumentService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async createInstrument(
    @Param() { id }: DefaultDto.pathParameter,
    @Body() body: UpdateDto.Body,
  ) {
    return this.updateInstrumentService.execute(id, body);
  }
}
