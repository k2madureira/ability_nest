import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { UpdateDto, DefaultDto } from '@modules/method/dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMethodService } from './updateMethod.service';

@ApiTags('Methods')
@UseGuards(JwtGuard, RolesGuard)
@Controller('methods')
export class UpdateMethodController {
  constructor(
    private updateMethodService: UpdateMethodService,
  ) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateMethod(
    @Param() { id }: DefaultDto.pathParameter,
    @Body() body: UpdateDto.Body,
  ) {
    return this.updateMethodService.execute(id, body);
  }
}
