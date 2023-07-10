import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { UpdateDto, DefaultDto } from '@modules/user/dto';
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
import { UpdateUserService } from './updateUser.service';

@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UpdateUserController {
  constructor(
    private updateUserService: UpdateUserService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param() { id }: DefaultDto.pathParameter,
    @Body() body: UpdateDto.Body,
  ) {
    return this.updateUserService.execute(id, body);
  }
}
