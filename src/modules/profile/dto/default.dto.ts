import { IsNotEmpty, IsUUID } from 'class-validator';

export class pathParameter {
  @IsUUID('all')
  @IsNotEmpty()
  id: string;
}
