import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class Query {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  urlImage?: string;

  @IsString()
  @IsOptional()
  instrumentId?: string;

  @IsBoolean()
  @IsOptional()
  main?: boolean;

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsInt()
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @IsOptional()
  perPage?: number = 10;
}
