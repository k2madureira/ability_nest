export const PERMISSIONS = {
  default: {
    ADMIN: ['CONDUCTOR', 'INSTRUCTOR', 'STUDENT'],
    CONDUCTOR: ['INSTRUCTOR', 'STUDENT'],
    INSTRUCTOR: ['STUDENT'],
    STUDENT: [],
  },
  post: {
    ADMIN: ['ADMIN', 'CONDUCTOR', 'INSTRUCTOR', 'STUDENT'],
    CONDUCTOR: ['CONDUCTOR', 'INSTRUCTOR', 'STUDENT'],
    INSTRUCTOR: ['STUDENT'],
    STUDENT: [],
  },
};

export const METHODS = ['patch', 'put', 'delete', 'post'];

export const ADMIN_ROUTES = ['methods', 'instruments'];

export const SUPER_ROLES = ['ADMIN', 'CONDUCTOR'];
