import { Module } from '@nestjs/common';
import { CreateProfileService } from './context/createProfile/createProfile.service';
import { CreateProfileController } from './context/createProfile/createProfile.controller';
import { UpdateProfileService } from './context/updateProfile/updateProfile.service';
import { UpdateProfileController } from './context/updateProfile/updateProfile.controller';
import { GetProfileByIdController } from './context/getProfileById/getProfileById.controller';
import { GetProfileByIdService } from './context/getProfileById/getProfileById.service';
import { GetProfilesService } from './context/getProfiles/getProfiles.service';
import { GetProfilesController } from './context/getProfiles/getProfiles.controller';
import { DeleteProfileByIdController } from './context/deleteProfile/deleteProfileById.controller';
import { DeleteProfileByIdService } from './context/deleteProfile/deleteProfileById.service';

@Module({
  controllers: [
    CreateProfileController,
    UpdateProfileController,
    GetProfileByIdController,
    GetProfilesController,
    DeleteProfileByIdController,
  ],
  providers: [
    CreateProfileService,
    UpdateProfileService,
    GetProfileByIdService,
    GetProfilesService,
    DeleteProfileByIdService,
  ],
})
export class ProfileModule {}
