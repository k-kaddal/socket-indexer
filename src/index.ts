import startEventListener from "./event-listener";
import startDataProcessor from "./data-processor";
import startApiServer from "./api-server";
import MessageService from "./shared/message/message.service";
import DatabaseService from "./shared/database/database.service";
import logger from "./shared/logger";
import {setupDatabase} from "./shared/database/setup";

(async function main() {
  logger.info("Socket Bridge Indexer");
  try {
    await Promise.all([
      MessageService.connect(),
      DatabaseService.query("SELECT 1"),
    ]);

    await setupDatabase();

    await Promise.all([
      startEventListener(),
      startDataProcessor(),
      startApiServer(),
    ]);
  } catch (error) {
    logger.error("Failed to start indexer:", error);
    DatabaseService.close();
    process.exit(1);
  }
})();
