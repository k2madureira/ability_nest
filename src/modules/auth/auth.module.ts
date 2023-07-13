import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignInController } from './context/signIn/signIn.controller';
import { SignInService } from './context/signIn/signIn.service';
import { SignUpController } from './context/signUp/signUp.controller';
import { SignUpService } from './context/signUp/signUp.service';
import { ResetPasswordService } from './context/resetPassword/resetPassword.service';
import { ResetPasswordController } from './context/resetPassword/resetPassword.controller';
import { ForgotPasswordController } from './context/forgotPassword/forgotPassword.controller';
import { ForgotPasswordService } from './context/forgotPassword/forgotPassword.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [
    SignInController,
    SignUpController,
    ResetPasswordController,
    ForgotPasswordController,
  ],
  providers: [
    JwtStrategy,
    SignInService,
    SignUpService,
    ResetPasswordService,
    ForgotPasswordService,
  ],
})
export class AuthModule {}
