export class SomeSpecificEstimationError extends Error {
  name: 'SomeSpecificEstimationError';

  constructor(message: string) {
    super(message);
    this.name = 'SomeSpecificEstimationError';
  }
}

export class SomeSpecificSendError extends Error {
  name: 'SomeSpecificSendError';

  constructor(message: string) {
    super(message);
    this.name = 'SomeSpecificSendError';
  }
}
