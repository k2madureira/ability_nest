import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/profile/dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteProfileByIdService } from './deleteProfileById.service';

@ApiTags('Profiles')
@UseGuards(JwtGuard, RolesGuard)
@Controller('profiles')
export class DeleteProfileByIdController {
  constructor(
    private deleteProfileByIdService: DeleteProfileByIdService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: DefaultDto.pathParameter) {
    return this.deleteProfileByIdService.execute(id);
  }
}
