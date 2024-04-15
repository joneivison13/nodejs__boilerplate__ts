import logger from "./logger";

export default class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    if (statusCode >= 500) {
      logger.error(this.message);
    } else {
      console.error(this.message);
    }
  }
}
