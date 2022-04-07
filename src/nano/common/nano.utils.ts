import { Scope } from '../interfaces';
import { NANO_PROVIDE_TOKEN_PREFIX } from '../nano.constants';
import * as Nano from 'nano';
import { Provider } from '@nestjs/common';

export function getScopeToken(name: string) {
  return `${NANO_PROVIDE_TOKEN_PREFIX}_${name}`;
}

export function normalizeScopeName(scope: Scope) {
  let name: string;
  if (typeof scope === 'string') name = scope;
  else if (typeof scope === 'function') name = scope.name;
  return name.toLowerCase();
}

export function createScopeProvider(
  documentScope: Scope,
  serverScope: Nano.ServerScope,
  create?: boolean,
): Provider {
  const name = normalizeScopeName(documentScope);
  return {
    provide: getScopeToken(name),
    useFactory: async () => {
      if (create) {
        try {
          await serverScope.db.create(name);
        } catch (err) {
          if (err.error !== 'file_exists') {
            throw err;
          }
        }
      }
      try {
        await serverScope.db.get(name);
        return serverScope.use(name);
      } catch (err) {
        throw err;
      }
    },
  };
}
