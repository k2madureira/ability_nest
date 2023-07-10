import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserGroup {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsBoolean()
  instructor?: boolean;
}

export class pathParameter {
  @IsUUID('all')
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
