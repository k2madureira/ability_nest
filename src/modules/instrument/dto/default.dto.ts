import { IsNotEmpty, IsUUID } from 'class-validator';

export class pathParameter {
  @IsUUID('all')
  @IsNotEmpty()
  id: string;
}

export const instrumentSchema = {
  id: true,
  name: true,
  family: true,
};
