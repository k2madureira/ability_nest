import { Module } from '@nestjs/common';
import { CreateUserService } from './context/createUser/createUser.service';
import { CreateUserController } from './context/createUser/createUser.controller';
import { UpdateUserService } from './context/updateUser/updateUser.service';
import { UpdateUserController } from './context/updateUser/updateUser.controller';
import { GetUserByIdController } from './context/getUserById/getUserById.controller';
import { GetUserByIdService } from './context/getUserById/getUserById.service';
import { GetUsersService } from './context/getUsers/getUsers.service';
import { GetUsersController } from './context/getUsers/getUsers.controller';
import { DeleteUserByIdController } from './context/deleteUser/deleteUserById.controller';
import { DeleteUserByIdService } from './context/deleteUser/deleteUserById.service';
import { GetCurrentUserController } from './context/getCurrentUser/getCurrentUser.controller';
import { GetCurrentService } from './context/getCurrentUser/getCurrentUser.service';

import { GetStudentsController } from './context/getStudents/getStudents.controller';
import { GetStudentsService } from './context/getStudents/getStudents.service';

@Module({
  controllers: [
    CreateUserController,
    UpdateUserController,
    GetUserByIdController,
    GetCurrentUserController,
    GetUsersController,
    GetStudentsController,
    DeleteUserByIdController,
  ],
  providers: [
    CreateUserService,
    UpdateUserService,
    GetUserByIdService,
    GetCurrentService,
    GetUsersService,
    GetStudentsService,
    DeleteUserByIdService,
  ],
})
export class UserModule {}
