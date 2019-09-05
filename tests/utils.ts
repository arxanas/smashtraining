interface ConsoleErrorsToken {
  beforeEach: (done: jest.DoneCallback) => void;
  afterEach: () => void;
}

/**
 * Catch any `console.errors` thrown by Vue. They aren't detected by Jest, so
 * they just appear as diagnostic output.
 *
 * From https://github.com/vuejs/vue/issues/9083#issuecomment-439693837
 */
export function flagConsoleErrors(): ConsoleErrorsToken {
  let errorSpy: jest.SpyInstance<any, any> | null = null;
  const beforeEach = (done: jest.DoneCallback) => {
    errorSpy = jest.spyOn(console, "error").mockImplementation(done.fail);
    done();
  };
  const afterEach = () => {
    if (errorSpy !== null) {
      errorSpy.mockRestore();
      errorSpy = null;
    }
  };
  return {
    beforeEach,
    afterEach,
  };
}

/**
 * Ignore messages logged to `console.error`. Useful to avoid logspam when
 * running tests when an error is expected in the test.
 * @param fn The callback to ignore console errors in.
 */
export function ignoreConsoleErrors<T>(fn: () => T): T {
  // tslint:disable-next-line no-console
  const oldConsoleErrors = console.error;
  try {
    // tslint:disable-next-line no-console
    console.error = () => {
      // Do nothing.
    };
    return fn();
  } finally {
    // tslint:disable-next-line no-console
    console.error = oldConsoleErrors;
  }
}
