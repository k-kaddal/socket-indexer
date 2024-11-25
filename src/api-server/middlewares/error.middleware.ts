import {Request, Response, NextFunction} from "express";
import logger from "@shared/logger";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);
  res
    .status(err.status || 500)
    .json({error: err.message || "Internal Server Error"});
};
