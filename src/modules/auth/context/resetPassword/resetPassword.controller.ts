import { ResetPassword } from '@modules/auth/dto';
import { JwtGuard } from '@modules/auth/guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordService } from './resetPassword.service';

@ApiTags('Auth')
@UseGuards(JwtGuard)
@Controller('auth')
export class ResetPasswordController {
  constructor(
    private resetPasswordService: ResetPasswordService,
  ) {}

  @ApiOkResponse({
    type: ResetPassword.Response,
  })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async createInstrument(
    @Body() body: ResetPassword.Request,
    @Req() req: any,
  ): Promise<ResetPassword.Response> {
    const { user } = req;
    return this.resetPasswordService.execute(body, user);
  }
}
