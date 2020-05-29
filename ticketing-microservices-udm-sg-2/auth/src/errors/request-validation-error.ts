import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // when extending classes in ts
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

// throw new RequestValidationError(error);
