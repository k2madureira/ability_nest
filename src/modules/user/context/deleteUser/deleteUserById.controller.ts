import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/user/dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserByIdService } from './deleteUserById.service';

@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class DeleteUserByIdController {
  constructor(
    private deleteUserByIdService: DeleteUserByIdService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: DefaultDto.pathParameter) {
    return this.deleteUserByIdService.execute(id);
  }
}
