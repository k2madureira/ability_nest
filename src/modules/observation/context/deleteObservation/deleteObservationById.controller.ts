import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/observation/dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteObservationByIdService } from './deleteObservationById.service';

@ApiTags('Observations')
@UseGuards(JwtGuard, RolesGuard)
@Controller('observations')
export class DeleteObservationByIdController {
  constructor(
    private deleteObservationByIdService: DeleteObservationByIdService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: DefaultDto.pathParameter) {
    return this.deleteObservationByIdService.execute(id);
  }
}
