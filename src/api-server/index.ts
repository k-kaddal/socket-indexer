import express from "express";
import bodyParser from "body-parser";
import eventRoutes from "./event.routes";
import {loggerMiddleware, errorMiddleware} from "./middlewares";
import logger from "@shared/logger";
import Config from "@shared/config";
import {consumeEnrichedEvent} from "./services";

const app = express();
const PORT = Config.PORT;

async function startApiServer(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      app.use(bodyParser.json());
      app.use(loggerMiddleware);
      app.use("/api/v1/events", eventRoutes);
      app.use(errorMiddleware);

      await consumeEnrichedEvent();

      app.listen(PORT, () => {
        logger.info(`API Server is running on port ${PORT}`);
        resolve();
      });
    } catch (error) {
      logger.error("Failed to start API server:", error);
      reject(error);
    }
  });
}

export default startApiServer;
