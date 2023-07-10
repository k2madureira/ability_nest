import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignInController } from './context/signIn/signIn.controller';
import { SignInService } from './context/signIn/signIn.service';
import { SignUpController } from './context/signUp/signUp.controller';
import { SignUpService } from './context/signUp/signUp.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SignInController, SignUpController],
  providers: [JwtStrategy, SignInService, SignUpService],
})
export class AuthModule {}
