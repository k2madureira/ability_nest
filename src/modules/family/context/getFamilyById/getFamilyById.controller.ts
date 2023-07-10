import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/family/dto';
import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetFamilyByIdService } from './getFamilyById.service';

@ApiTags('Families')
@UseGuards(JwtGuard, RolesGuard)
@Controller('families')
export class GetFamilyByIdController {
  constructor(
    private getFamilyByIdService: GetFamilyByIdService,
  ) {}

  @Get(':id')
  async getId(@Param() { id }: DefaultDto.pathParameter) {
    return this.getFamilyByIdService.execute(id);
  }
}
