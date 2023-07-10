import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/instrument/dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteInstrumentByIdService } from './deleteInstrumentById.service';

@ApiTags('Instruments')
@UseGuards(JwtGuard, RolesGuard)
@Controller('instruments')
export class DeleteInstrumentByIdController {
  constructor(
    private deleteInstrumentByIdService: DeleteInstrumentByIdService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async createInstrument(
    @Param() { id }: DefaultDto.pathParameter,
  ) {
    return this.deleteInstrumentByIdService.execute(id);
  }
}
