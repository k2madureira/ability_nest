import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/user/dto';
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersService } from './getUsers.service';

@ApiTags('Users')
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class GetUsersController {
  constructor(private getUsersService: GetUsersService) {}

  @Get()
  async getUsers(@Query() query: ListDto.Query) {
    return this.getUsersService.execute(query);
  }
}
