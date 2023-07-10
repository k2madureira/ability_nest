import { IsNotEmpty, IsString } from 'class-validator';

export class Body {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
