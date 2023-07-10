import { IsString, IsOptional } from 'class-validator';

export class Body {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  familyId?: string;
}
