import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { MethodModule } from '@modules/method/method.module';
import { InstrumentModule } from '@modules/instrument/instrument.module';
import { FamilyModule } from '@modules/family/family.module';
import { ObservationModule } from '@modules/observation/observation.module';
import { GroupModule } from '@modules/group/group.module';
import { HomeModule } from '@modules/home/home.module';
import { StateModule } from '@modules/state/state.module';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { HelperModule } from '@shared/helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    MethodModule,
    FamilyModule,
    InstrumentModule,
    ObservationModule,
    GroupModule,
    HomeModule,
    StateModule,
    PrismaModule,
    HelperModule,
  ],
})
export class AppModule {}
