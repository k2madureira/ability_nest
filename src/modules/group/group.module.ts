import { Module } from '@nestjs/common';
import { CreateGroupService } from './context/createGroup/createGroup.service';
import { CreateGroupController } from './context/createGroup/createGroup.controller';
import { UpdateGroupService } from './context/updateGroup/updateGroup.service';
import { UpdateGroupController } from './context/updateGroup/updateGroup.controller';
import { GetGroupByIdController } from './context/getGroupById/getGroupById.controller';
import { GetGroupByIdService } from './context/getGroupById/getGroupById.service';
import { GetGroupsService } from './context/getGroups/getGroups.service';
import { GetGroupsController } from './context/getGroups/getGroups.controller';
import { DeleteGroupByIdController } from './context/deleteGroup/deleteGroupById.controller';
import { DeleteGroupByIdService } from './context/deleteGroup/deleteGroupById.service';

@Module({
  controllers: [
    CreateGroupController,
    UpdateGroupController,
    GetGroupByIdController,
    GetGroupsController,
    DeleteGroupByIdController,
  ],
  providers: [
    CreateGroupService,
    UpdateGroupService,
    GetGroupByIdService,
    GetGroupsService,
    DeleteGroupByIdService,
  ],
})
export class GroupModule {}
