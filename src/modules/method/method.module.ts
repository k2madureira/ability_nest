import { Module } from '@nestjs/common';
import { CreateMethodService } from './context/createMethod/createMethod.service';
import { CreateMethodController } from './context/createMethod/createMethod.controller';
import { UpdateMethodService } from './context/updateMethod/updateMethod.service';
import { UpdateMethodController } from './context/updateMethod/updateMethod.controller';
import { GetMethodByIdController } from './context/getMethodById/getMethodById.controller';
import { GetMethodByIdService } from './context/getMethodById/getMethodById.service';
import { GetMethodsService } from './context/getMethods/getMethods.service';
import { GetMethodsController } from './context/getMethods/getMethods.controller';
import { DeleteMethodByIdController } from './context/deleteMethod/deleteMethodById.controller';
import { DeleteMethodByIdService } from './context/deleteMethod/deleteMethodById.service';

@Module({
  controllers: [
    CreateMethodController,
    UpdateMethodController,
    GetMethodByIdController,
    GetMethodsController,
    DeleteMethodByIdController,
  ],
  providers: [
    CreateMethodService,
    UpdateMethodService,
    GetMethodByIdService,
    GetMethodsService,
    DeleteMethodByIdService,
  ],
})
export class MethodModule {}
