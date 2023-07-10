import { Module } from '@nestjs/common';

import { GetStatesService } from './context/getStates/getStates.service';
import { GetStatesController } from './context/getStates/getStates.controller';

@Module({
  controllers: [GetStatesController],
  providers: [GetStatesService],
})
export class StateModule {}
