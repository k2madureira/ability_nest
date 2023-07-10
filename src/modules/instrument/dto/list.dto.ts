import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class Query {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  family?: string;

  @IsString()
  @IsOptional()
  slug?: string;

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
