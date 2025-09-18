import { ErrorHandler } from '@angular/core';
import { MyErrorHandler, provideErrorHandler } from './error';
import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MyErrorHandler (Jest)', () => {
  let errorHandler: ErrorHandler;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      providers: [
        // ✅ diese zwei Provider sind klassisch kompatibel
        { provide: ErrorHandler, useClass: MyErrorHandler },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    errorHandler = TestBed.inject(ErrorHandler);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should be an instance of MyErrorHandler', () => {
    expect(errorHandler).toBeInstanceOf(MyErrorHandler);
  });

  it('should call console.log when handleError is called', () => {
    const testError = new Error('Test error');
    errorHandler.handleError(testError);
    expect(consoleLogSpy).toHaveBeenCalledWith(testError);
  });
});
