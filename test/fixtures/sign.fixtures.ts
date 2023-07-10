import { faker } from '@faker-js/faker';
import { SignUp, SignIn } from '../../src/modules/auth/dto';

export const bodyUp: SignUp.Request = {
  firstName: faker.name.firstName(),
  password: 'ADMIN1234',
  email: 'ADMIN@ADMIN.COM',
};

export const bodyIn: SignIn.Request = {
  password: bodyUp.password,
  email: bodyUp.email,
};

export const hash =
  '$argon2i$v=19$m=4096,t=3,p=1$nhHsjCymB3Lx/dhFj1sGRg$1/PQ1EeJV42GjQngeR4Ib9z39hcrFo1hzj44+TYJ4us';
