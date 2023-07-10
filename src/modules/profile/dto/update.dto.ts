import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Body {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
