import { ApiProperty } from '@nestjs/swagger';

import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class Query {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  studentId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  instructorId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  replyFromId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sortField?: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiProperty()
  @IsInt()
  @IsOptional()
  page?: number = 1;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  perPage?: number = 10;
}
