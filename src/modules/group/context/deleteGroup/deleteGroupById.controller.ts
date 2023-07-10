import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/group/dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteGroupByIdService } from './deleteGroupById.service';

@ApiTags('Groups')
@UseGuards(JwtGuard, RolesGuard)
@Controller('groups')
export class DeleteGroupByIdController {
  constructor(
    private deleteGroupByIdService: DeleteGroupByIdService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: DefaultDto.pathParameter) {
    return this.deleteGroupByIdService.execute(id);
  }
}
