import * as eventService from "./services";
import {Request, Response, NextFunction} from "express";
import logger from "@shared/logger";

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const event = await eventService.getEventById(id);

    if (!event) {
      res.status(404).json({success: false, message: "Event not found"});
    }
    res.status(200).json({success: true, data: event});
  } catch (error) {
    next(error);
  }
};

export const streamEvents = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    logger.debug("New client connected");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write("socker-indexer connected\n\n");

    eventService.addClient(res);

    req.on("close", () => {
      eventService.removeClient(res);
      logger.debug("Client disconnected");
    });
  } catch (error) {
    next(error);
  }
};
