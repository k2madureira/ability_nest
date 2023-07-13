import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Request {
  @ApiProperty()
  @IsString()
  email: string;
}

export class Response {
  @ApiProperty()
  @IsString()
  email: string;
}
