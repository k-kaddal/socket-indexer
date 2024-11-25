import pino from "pino";
import Config from "@shared/config";

const isProduction = Config.NODE_ENV === "production";

const logger = pino({
  level: isProduction ? "info" : "debug",
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: "yyyy-mm-dd HH:MM:ss.l",
          ignore: "pid,hostname",
        },
      },
  formatters: {
    level(label) {
      return {level: label.toUpperCase()};
    },
  },
  base: {
    pid: false,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
