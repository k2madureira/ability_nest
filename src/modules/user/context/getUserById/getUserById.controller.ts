import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/user/dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUserByIdService } from './getUserById.service';

@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class GetUserByIdController {
  constructor(
    private getUserByIdService: GetUserByIdService,
  ) {}

  @Get(':id')
  async getId(@Param() { id }: DefaultDto.pathParameter) {
    return this.getUserByIdService.execute(id);
  }
}
