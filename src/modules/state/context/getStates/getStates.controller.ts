import { ListDto } from '@modules/profile/dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetStatesService } from './getStates.service';

@ApiTags('States')
@Controller('states')
export class GetStatesController {
  constructor(private getStatesService: GetStatesService) {}

  @Get()
  async getStates(@Query() query: ListDto.Query) {
    return this.getStatesService.execute(query);
  }
}
