import { CustomError } from "./curstom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to the database";
  statusCode = 500;

  constructor() {
    // the string is for logging purpouses only
    super("Error connecting to DB");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
