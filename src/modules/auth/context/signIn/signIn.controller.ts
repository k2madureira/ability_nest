import { SignIn } from '@modules/auth/dto';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInService } from './signIn.service';

@ApiTags('Auth')
@Controller('auth')
export class SignInController {
  constructor(private signInService: SignInService) {}

  @ApiOkResponse({
    type: SignIn.Response,
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async createInstrument(
    @Body() body: SignIn.Request,
  ): Promise<SignIn.Response> {
    return this.signInService.execute(body);
  }
}
