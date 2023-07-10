import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ONE_MAIN } from '@shared/helper/config/messages';
import { Methods, manyMain } from './default.dto';

export class Body {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  secondName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  urlImage?: string;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsString()
  @IsOptional()
  profileId?: string;

  @IsString()
  @IsOptional()
  instrumentId?: string;

  @IsString()
  @IsOptional()
  stateId?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(manyMain, {
    message: ONE_MAIN,
  })
  methods?: Methods[];
}
