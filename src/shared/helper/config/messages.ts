export const INVALID_REFRESH_TOKEN =
  'invalid-refresh-token';
export const INVALID_ACCESS_TOKEN = 'invalid-access-token';
export const INVALID_CREDENTIALS = 'invalid-credentials';
export const LOGOUT_SUCCESSFUL = 'logout-successful';
export const ACCESS_DENIED =
  'access-denied-for-this-procedure';

export const NOT_ACCEPTABLE = (param: string): string =>
  `${param}-have-active-relations`;

export const NOT_FOUND = (param: string): string =>
  `${param}-not-found`;

export const CONFLICT = (param: string): string =>
  `${param}-already-exists`;

export const ONE_MAIN = 'only-one-main-allowed';
