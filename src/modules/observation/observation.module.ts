import { Module } from '@nestjs/common';
import { CreateObservationService } from './context/createObservation/createObservation.service';
import { CreateObservationController } from './context/createObservation/createObservation.controller';
import { UpdateObservationService } from './context/updateObservation/updateObservation.service';
import { UpdateObservationController } from './context/updateObservation/updateObservation.controller';
import { GetObservationByIdController } from './context/getObservationById/getObservationById.controller';
import { GetObservationByIdService } from './context/getObservationById/getObservationById.service';
import { GetObservationsService } from './context/getObservations/getObservations.service';
import { GetObservationsController } from './context/getObservations/getObservations.controller';
import { DeleteObservationByIdController } from './context/deleteObservation/deleteObservationById.controller';
import { DeleteObservationByIdService } from './context/deleteObservation/deleteObservationById.service';

@Module({
  controllers: [
    CreateObservationController,
    UpdateObservationController,
    GetObservationByIdController,
    GetObservationsController,
    DeleteObservationByIdController,
  ],
  providers: [
    CreateObservationService,
    UpdateObservationService,
    GetObservationByIdService,
    GetObservationsService,
    DeleteObservationByIdService,
  ],
})
export class ObservationModule {}
