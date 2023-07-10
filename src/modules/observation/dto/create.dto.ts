import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Body {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  reply?: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instructorId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  replyFromId?: string;
}
