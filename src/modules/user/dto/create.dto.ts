import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ONE_MAIN } from '@shared/helper/config/messages';
import { Methods, Groups, manyMain } from './default.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  secondName?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  urlImage?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tel?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  profileId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  instrumentId?: string = null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stateId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(manyMain, {
    message: ONE_MAIN,
  })
  methods?: Methods;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  groups?: Groups;
}
