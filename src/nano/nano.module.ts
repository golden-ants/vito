import { DynamicModule, Module } from '@nestjs/common';
import { NanoModuleOptions } from './interfaces';
import * as Nano from 'nano';
import { NANO_MODULE_OPTIONS, NANO_SERVER_SCOPE } from './nano.constants';
import { createScopeProvider } from './common';

@Module({})
export class NanoModule {
  public static forRoot(options: NanoModuleOptions): DynamicModule {
    return NanoModule.register(options, true);
  }

  public static register(
    options: NanoModuleOptions,
    global?: boolean,
  ): DynamicModule {
    const { scopeOptions: resourceOptions, nanoOptions } = options;
    const { create, use } = resourceOptions;

    const serverScope = Nano(nanoOptions);
    const scopes = use.map((scope) =>
      createScopeProvider(scope, serverScope, create),
    );

    return {
      global,
      module: NanoModule,
      exports: [...scopes, NANO_SERVER_SCOPE],
      providers: [
        {
          provide: NANO_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: NANO_SERVER_SCOPE,
          useValue: serverScope,
        },
        ...scopes,
      ],
    };
  }
}
