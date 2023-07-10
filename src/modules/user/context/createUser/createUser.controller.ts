import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { CreateDto } from '@modules/user/dto';
import { UserSchema } from '@modules/user/dto/default.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserService } from './createUser.service';

@ApiTags('Users')
@ApiCreatedResponse({
  type: UserSchema,
})
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class CreateUserController {
  constructor(
    private createUserService: CreateUserService,
  ) {}
  @Post()
  async create(@Body() body: CreateDto.UserRequest) {
    return this.createUserService.execute(body);
  }
}
