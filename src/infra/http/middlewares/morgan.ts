import morgan from "morgan";
import logger from "../../../utils/logger";

function myCustomLogger(message: string) {
  logger.info(message);
}

export const myStream = {
  write: (message: string) => {
    myCustomLogger(message);
  },
};

// ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

morgan.format("DefaultFormat", (tokens, req, res) => {
  return [
    tokens["remote-addr"](req, res),
    "-",
    tokens["remote-user"](req, res) || "----",
    "[" + tokens["date"](req, res, "clf") + "]",
    '"' + tokens["method"](req, res),
    tokens["url"](req, res),
    "HTTP/" + tokens["http-version"](req, res) + '"',
    tokens["status"](req, res),
    tokens["res"](req, res, "content-length"),
    '"' + tokens["user-agent"](req, res) + '"',
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

export default morgan;
