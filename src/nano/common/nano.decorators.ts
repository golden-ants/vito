import { Inject } from '@nestjs/common';
import { Scope } from '../interfaces';
import { getScopeToken, normalizeScopeName } from './nano.utils';

export const InjectScope = (scope: Scope): ReturnType<typeof Inject> =>
  Inject(getScopeToken(normalizeScopeName(scope)));
