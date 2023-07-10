import { faker } from '@faker-js/faker';
import { CreateDto } from '../../src/modules/instrument/dto';

export const randomUUID = faker.datatype.uuid();
export const body: CreateDto.Body = {
  name: faker.random.word(),
  family: faker.random.word(),
};
