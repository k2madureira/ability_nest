import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Body {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
