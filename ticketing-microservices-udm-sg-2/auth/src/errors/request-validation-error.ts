import { ValidationError } from "express-validator";
import { CustomError } from "./curstom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    // the string is for logging purpouses only
    super("Invalid request parameters");

    // when extending classes in ts
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}

// throw new RequestValidationError(error);
