import { Module } from '@nestjs/common';
import { CreateInstrumentService } from './context/createInstrument/createInstrument.service';
import { CreateInstrumentController } from './context/createInstrument/createInstrument.controller';
import { UpdateInstrumentService } from './context/updateInstrument/updateInstrument.service';
import { UpdateInstrumentController } from './context/updateInstrument/updateInstrument.controller';
import { GetInstrumentByIdController } from './context/getInstrumentById/getInstrumentById.controller';
import { GetInstrumentByIdService } from './context/getInstrumentById/getInstrumentById.service';
import { GetInstrumentsService } from './context/getInstruments/getInstruments.service';
import { GetInstrumentsController } from './context/getInstruments/getInstruments.controller';
import { DeleteInstrumentByIdController } from './context/deleteInstrument/deleteInstrumentById.controller';
import { DeleteInstrumentByIdService } from './context/deleteInstrument/deleteInstrumentById.service';

@Module({
  controllers: [
    CreateInstrumentController,
    UpdateInstrumentController,
    GetInstrumentByIdController,
    GetInstrumentsController,
    DeleteInstrumentByIdController,
  ],
  providers: [
    CreateInstrumentService,
    UpdateInstrumentService,
    GetInstrumentByIdService,
    GetInstrumentsService,
    DeleteInstrumentByIdService,
  ],
})
export class InstrumentModule {}
