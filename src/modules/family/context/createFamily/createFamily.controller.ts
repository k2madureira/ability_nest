import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { CreateDto } from '@modules/family/dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFamilyService } from './createFamily.service';

@ApiTags('Families')
@UseGuards(JwtGuard, RolesGuard)
@Controller('families')
export class CreateFamilyController {
  constructor(
    private createFamilyService: CreateFamilyService,
  ) {}
  @Post()
  async create(@Body() body: CreateDto.Body) {
    return this.createFamilyService.execute(body);
  }
}
