import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/method/dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteMethodByIdService } from './deleteMethodById.service';

@ApiTags('Methods')
@UseGuards(JwtGuard, RolesGuard)
@Controller('methods')
export class DeleteMethodByIdController {
  constructor(
    private deleteMethodByIdService: DeleteMethodByIdService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: DefaultDto.pathParameter) {
    return this.deleteMethodByIdService.execute(id);
  }
}
