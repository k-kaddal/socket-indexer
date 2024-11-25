import {Request, Response, NextFunction} from "express";
import logger from "@shared/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
