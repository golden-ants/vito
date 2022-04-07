import { Configuration } from 'nano';
import { Scope } from './scope.type';

export interface NanoModuleOptions {
  nanoOptions: Configuration;
  scopeOptions?: ScopeOptions;
}

export interface ScopeOptions {
  /**
   * Domain entity or database name.
   */
  use: Scope[];

  /**
   * Сreate a database if it does not exist.
   */
  create?: boolean;
}
