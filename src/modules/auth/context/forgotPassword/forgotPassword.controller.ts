import { ForgotPassword } from '@modules/auth/dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordService } from './forgotPassword.service';

@ApiTags('Auth')
@Controller('auth')
export class ForgotPasswordController {
  constructor(
    private forgotPasswordService: ForgotPasswordService,
  ) {}

  @ApiOkResponse({
    type: ForgotPassword.Response,
  })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async createInstrument(
    @Body() body: ForgotPassword.Request,
  ): Promise<ForgotPassword.Response> {
    return this.forgotPasswordService.execute(body);
  }
}
