import { Module } from '@nestjs/common';

import { GetHomeStatusService } from './context/getHomeStatus/getHomeStatus.service';
import { GetHomeStatusController } from './context/getHomeStatus/getHomeStatus.controller';
import { GetHomeTheoryService } from './context/getHomeTheory/getHomeTheory.service';
import { GetHomeTheoryController } from './context/getHomeTheory/getHomeTheory.controller';

@Module({
  controllers: [
    GetHomeStatusController,
    GetHomeTheoryController,
  ],
  providers: [GetHomeStatusService, GetHomeTheoryService],
})
export class HomeModule {}
