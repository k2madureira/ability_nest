import { JwtGuard, RolesGuard } from '@modules/auth/guard';
import { DefaultDto } from '@modules/family/dto';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteFamilyByIdService } from './deleteFamilyById.service';

@ApiTags('Families')
@UseGuards(JwtGuard, RolesGuard)
@Controller('families')
export class DeleteFamilyByIdController {
  constructor(
    private deleteFamilyByIdService: DeleteFamilyByIdService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: DefaultDto.pathParameter) {
    return this.deleteFamilyByIdService.execute(id);
  }
}
