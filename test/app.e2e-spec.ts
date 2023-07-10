import {
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/shared/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { sign, user, method, instrument } from './fixtures';

describe('🤖 🔍 [E2E]\n', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    await prisma.user.create({
      data: {
        email: sign.bodyIn.email,
        hash: sign.hash,
        firstName: sign.bodyUp.firstName,
        role: 'ADMIN',
      },
    });
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('🤖 [Auth]\n', () => {
    const route = '/auth';
    describe('▶ Sign-Up \n', () => {
      it('🔍 Should be able to sign-up', () => {
        return pactum
          .spec()
          .post(`${route}/sign-up`)
          .withBody({
            ...sign.bodyUp,
            email: 'mail@mail.com',
          })
          .expectStatus(HttpStatus.CREATED);
      });

      it('🔍 Should not be able sign-up with duplicate email', () => {
        return pactum
          .spec()
          .post(`${route}/sign-up`)
          .withBody(sign.bodyUp)
          .expectStatus(HttpStatus.CONFLICT);
      });

      it('🔍 Should not be able sign-up without field\n', () => {
        return pactum
          .spec()
          .post(`${route}/sign-up`)
          .withBody({ ...sign.bodyUp, email: '' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });
    });
    describe('▶ Sign-in \n', () => {
      it('🔍 Should not be able sign-in with wrong type of email', () => {
        return pactum
          .spec()
          .post(`${route}/sign-in`)
          .withBody({ ...sign.bodyIn, email: 'ERROR' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('🔍 Should not be able sign-in with wrong email', () => {
        return pactum
          .spec()
          .post(`${route}/sign-in`)
          .withBody({
            ...sign.bodyIn,
            email: 'ERROR@MAIL.COM',
          })
          .expectStatus(HttpStatus.FORBIDDEN);
      });

      it('🔍 Should be able sign-in\n', () => {
        return pactum
          .spec()
          .post(`${route}/sign-in`)
          .withBody(sign.bodyIn)
          .expectStatus(HttpStatus.OK)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('🤖 [User]\n', () => {
    const route = '/users';
    describe('▶ Detail user\n', () => {
      it('🔍 Should be able to get current user\n', () => {
        return pactum
          .spec()
          .get(`/me`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('▶ Create user\n', () => {
      it('🔍 Should not be able to create a user without field', () => {
        return pactum
          .spec()
          .post(`${route}`)
          .withBody({
            ...user.body,
            email: '',
          })
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('🔍 Should be able to create a user', () => {
        return pactum
          .spec()
          .post(`${route}`)
          .withBody(user.body)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.CREATED)
          .stores('userId', 'id')
          .stores('userEmail', 'email');
      });

      it('🔍 Should be able to create a STUDENT user', () => {
        return pactum
          .spec()
          .post(`${route}`)
          .withBody(user.studentBody)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.CREATED)
          .stores('studentId', 'id');
      });

      it('🔍 Should be able sign-in an ADMIN\n', () => {
        return pactum
          .spec()
          .post(`/auth/sign-in`)
          .withBody(user.body)
          .expectStatus(HttpStatus.OK)
          .stores('userAt', 'access_token');
      });
    });

    describe('▶ Update user\n', () => {
      it('🔍 Should be able to update a user', () => {
        return pactum
          .spec()
          .patch(`${route}/{id}`)
          .withPathParams('id', '$S{studentId}')
          .withBody(user.studentBody)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK)
          .expectBodyContains(user.studentBody.email);
      });

      it('🔍 Should not be able to update a user with wrong ID\n', () => {
        return pactum
          .spec()
          .patch(`${route}/{id}`)
          .withPathParams('id', 'ERROR')
          .withBody(user.studentBody)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.NOT_FOUND);
      });
    });
    describe('▶ List users\n', () => {
      it('🔍 Should be able to list all users\n', () => {
        return pactum
          .spec()
          .get(`${route}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK);
      });
    });
  });

  describe('🤖 [Method]\n', () => {
    const route = '/methods';
    describe('▶ Create method\n', () => {
      it('🔍 Should not be able to create a method without field', () => {
        return pactum
          .spec()
          .post(`${route}`)
          .withBody({
            ...method.body,
            title: '',
          })
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('🔍 Should be able to create a method\n', () => {
        return pactum
          .spec()
          .post(`${route}`)
          .withBody(method.body)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.CREATED)
          .stores('methodId', 'id');
      });
    });
    describe('▶ List method\n', () => {
      it('🔍 Should be able to list all methods\n', () => {
        return pactum
          .spec()
          .get(`${route}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK);
      });
    });
    describe('▶ Detail method\n', () => {
      it('🔍 Should be able to get a method', () => {
        return pactum
          .spec()
          .get(`${route}/$S{methodId}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK);
      });
      it('🔍 Should be able to return ERROR: method-not-found\n', () => {
        return pactum
          .spec()
          .get(`${route}/${method.randomUUID}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.NOT_FOUND);
      });
    });
    describe('▶ Edit method\n', () => {
      it('🔍 Should be able to update a method\n', () => {
        return pactum
          .spec()
          .patch(`${route}/{id}`)
          .withPathParams('id', '$S{methodId}')
          .withBody(method.body)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK)
          .expectBodyContains(method.body.title);
      });
    });

    describe('▶ Delete method\n', () => {
      it('🔍 Should be able to delete a method', () => {
        return pactum
          .spec()
          .delete(`${route}/$S{methodId}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.NO_CONTENT);
      });
    });
  });

  describe('🤖 [Instrument]\n', () => {
    const route = '/instruments';
    describe('▶ Create instrument\n', () => {
      it('🔍 Should not be able to create a instrument without field', () => {
        return pactum
          .spec()
          .post(`${route}`)
          .withBody({
            ...instrument.body,
            name: '',
          })
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('🔍 Should be able to create a instrument\n', () => {
        return pactum
          .spec()
          .post(`${route}`)
          .withBody(instrument.body)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.CREATED)
          .stores('instrumentId', 'id');
      });
    });
    describe('▶ List instrument\n', () => {
      it('🔍 Should be able to list all instruments\n', () => {
        return pactum
          .spec()
          .get(`${route}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK);
      });
    });
    describe('▶ Detail instrument\n', () => {
      it('🔍 Should be able to get a instrument', () => {
        return pactum
          .spec()
          .get(`${route}/$S{instrumentId}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK);
      });
      it('🔍 Should be able to return ERROR: instrument-not-found\n', () => {
        return pactum
          .spec()
          .get(`${route}/${instrument.randomUUID}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.NOT_FOUND);
      });
    });
    describe('▶ Edit instrument\n', () => {
      it('🔍 Should be able to update a instrument\n', () => {
        return pactum
          .spec()
          .patch(`${route}/{id}`)
          .withPathParams('id', '$S{instrumentId}')
          .withBody(instrument.body)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK)
          .expectBodyContains(instrument.body.name);
      });
    });

    describe('▶ Delete instrument\n', () => {
      it('🔍 Should be able to delete a instrument', () => {
        return pactum
          .spec()
          .delete(`${route}/$S{instrumentId}`)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.NO_CONTENT);
      });
    });
  });
});
