import { Injectable } from '@nestjs/common';
import { isBoolean } from 'class-validator';

@Injectable()
export class HelperService {
  queryBuild(params: any) {
    const query: any = {
      where: {
        deletedAt: {
          not: true,
        },
      },
    };

    if (params.sortField) {
      Object.assign(query, {
        orderBy: [
          {
            [`${params.sortField}`]:
              params.sortOrder || 'asc',
          },
        ],
      });
    }

    Object.entries(params).forEach(([key, value]) => {
      if (
        ![
          'page',
          'perPage',
          'sortField',
          'sortOrder',
        ].includes(key)
      ) {
        Object.assign(query.where, {
          [`${key}`]: !isBoolean(value)
            ? {
                contains: value,
                mode: 'insensitive',
              }
            : {
                equals: value,
              },
        });
      }
    });

    return {
      ...query,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
    };
  }

  slug(str: string): string {
    let slug = str.replace(/^\s+|\s+$/g, '').toLowerCase();

    const from = 'àáäâãèéëêìíïîòóöôõùúüûñç·/_,:;';
    const to = 'aaaaaeeeeiiiiooooouuuunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
      slug = slug.replace(
        new RegExp(`[${from.charAt(i)}]`, 'g'),
        to.charAt(i),
      );
    }

    slug = slug
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return slug.trim();
  }

  arrayUnique(a: any[]): any[] {
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }
    return a;
  }
}
