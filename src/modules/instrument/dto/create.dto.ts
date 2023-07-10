import { IsNotEmpty, IsString } from 'class-validator';

export class Body {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  familyId: string;
}
