import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/method/dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetMethodByIdService } from './getMethodById.service';

@ApiTags('Methods')
@UseGuards(JwtGuard, RolesGuard)
@Controller('methods')
export class GetMethodByIdController {
  constructor(
    private getMethodByIdService: GetMethodByIdService,
  ) {}

  @Get(':id')
  async getId(@Param() { id }: DefaultDto.pathParameter) {
    return this.getMethodByIdService.execute(id);
  }
}
