import path from "node:path";
import winston from "winston";

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    let message = `${info.timestamp} ${info.level}: ${info.message}`;
    if (info.stack)
      message = `${info.timestamp} ${info.level}: Stack Trace: ${info.stack}`;
    return message;
  })
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/info.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
    }),
  ],
});

export default logger;
