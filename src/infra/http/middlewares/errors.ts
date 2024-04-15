import { NextFunction, Request, Response } from "express";
import AppError from "../../../utils/error";
import logger from "../../../utils/logger";

export default class errorsMiddleware {
  constructor() {}

  static async handle(
    error: Error & Partial<AppError>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    logger.error(JSON.stringify(error.message, null, 2));

    return res.status(error.statusCode ?? 400).json({
      error:
        String(error)[0] === "{" ||
        error.message[0] === "{" ||
        String(error)[0] === "[" ||
        error.message[0] === "["
          ? JSON.parse(error.message)
          : error.message
          ? error.message
          : error,
    });
  }
}
