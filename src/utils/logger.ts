import { createLogger, transports, format } from "winston";
import path from "path";
import moment from "moment";

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `${moment(String(timestamp)).format(
    "MMMM Do YYYY, h:mm:ss a"
  )} [${level}]: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: path.join(process.cwd(), "logs", "app.log"),
    }),
    new transports.Console({ format: combine(colorize(), logFormat) }),
  ],
});

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};
