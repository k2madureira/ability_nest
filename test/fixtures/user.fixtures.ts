import { faker } from '@faker-js/faker';
import { CreateDto } from '../../src/modules/user/dto';

export const body: CreateDto.UserRequest = {
  firstName: faker.name.firstName(),
  secondName: faker.name.lastName(),
  password: faker.random.word(),
  email: faker.internet.email(),
  role: 'ADMIN',
  state: faker.address.state(),
  city: faker.address.city(),
  district: faker.address.streetName(),
  zipCode: faker.address.zipCode(),
  tel: faker.phone.phoneNumber(),
};

export const studentBody: CreateDto.UserRequest = {
  firstName: faker.name.firstName(),
  secondName: faker.name.lastName(),
  password: faker.random.word(),
  email: faker.internet.email(),
  role: 'STUDENT',
  state: faker.address.state(),
  city: faker.address.city(),
  district: faker.address.streetName(),
  zipCode: faker.address.zipCode(),
  tel: faker.phone.phoneNumber(),
};
