import { faker } from '@faker-js/faker';
import { CreateDto } from '../../src/modules/method/dto';

export const randomUUID = faker.datatype.uuid();
export const body: CreateDto.Body = {
  title: faker.random.word(),
  description: faker.random.word(),
};
