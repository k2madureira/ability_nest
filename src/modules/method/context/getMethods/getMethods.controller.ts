import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { ListDto } from '@modules/method/dto';
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetMethodsService } from './getMethods.service';

@ApiTags('Methods')
@UseGuards(JwtGuard, RolesGuard)
@Controller('methods')
export class GetMethodsController {
  constructor(
    private getMethodsService: GetMethodsService,
  ) {}

  @Get()
  async getMethods(@Query() query: ListDto.Query) {
    return this.getMethodsService.execute(query);
  }
}
