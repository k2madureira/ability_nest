import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { CreateDto } from '@modules/method/dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMethodService } from './createMethod.service';

@ApiTags('Methods')
@UseGuards(JwtGuard, RolesGuard)
@Controller('methods')
export class CreateMethodController {
  constructor(
    private createMethodService: CreateMethodService,
  ) {}
  @Post()
  async create(@Body() body: CreateDto.Body) {
    return this.createMethodService.execute(body);
  }
}
