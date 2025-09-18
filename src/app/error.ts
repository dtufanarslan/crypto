import { ErrorHandler, Injectable, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    console.log(error);
  }
}

export function provideErrorHandler(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ErrorHandler, useClass: MyErrorHandler }
  ]);
}
