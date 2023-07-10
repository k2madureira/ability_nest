import { Module } from '@nestjs/common';
import { CreateFamilyService } from './context/createFamily/createFamily.service';
import { CreateFamilyController } from './context/createFamily/createFamily.controller';
import { UpdateFamilyService } from './context/updateFamily/updateFamily.service';
import { UpdateFamilyController } from './context/updateFamily/updateFamily.controller';
import { GetFamilyByIdController } from './context/getFamilyById/getFamilyById.controller';
import { GetFamilyByIdService } from './context/getFamilyById/getFamilyById.service';
import { GetFamiliesService } from './context/getFamilies/getFamilies.service';
import { GetFamiliesController } from './context/getFamilies/getFamilies.controller';
import { DeleteFamilyByIdController } from './context/deleteFamily/deleteFamilyById.controller';
import { DeleteFamilyByIdService } from './context/deleteFamily/deleteFamilyById.service';

@Module({
  controllers: [
    CreateFamilyController,
    UpdateFamilyController,
    GetFamilyByIdController,
    GetFamiliesController,
    DeleteFamilyByIdController,
  ],
  providers: [
    CreateFamilyService,
    UpdateFamilyService,
    GetFamilyByIdService,
    GetFamiliesService,
    DeleteFamilyByIdService,
  ],
})
export class FamilyModule {}
