import { SignUp } from '@modules/auth/dto';
import { UserSchema } from '@modules/user/dto/default.dto';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpService } from './signUp.service';

@ApiTags('Auth')
@Controller('sign-up')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @ApiCreatedResponse({
    type: UserSchema,
  })
  @Post()
  async createInstrument(@Body() body: SignUp.Request) {
    return this.signUpService.execute(body);
  }
}
