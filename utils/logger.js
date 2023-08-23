import { Console, File } from "winston/lib/winston/transports";
import { createLogger, format, transports, Logger } from "winston";

export const logger = createLogger({
  level: "info",
  // levels: logLevels,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${JSON.stringify(
        message
      )}`;
    })
  ),
  transports: [
    new Console({
      level: "info",
      format: format.combine(
        format.colorize({ all: true }),
        format.splat()
        // format.printf(
        //   ({ level, message }: { level: string; message: string }) => {
        //     return `${level.toUpperCase()} ${message}`;
        //   }
        // )
      ),
    }),
    new File({
      dirname: "logs",
      filename: "winston.log",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
      ),
    }),
  ],
});
