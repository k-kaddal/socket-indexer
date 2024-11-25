import logger from "@shared/logger";
import MessageService from "@shared/message/message.service";
import {EQueues} from "@shared/message";
import processEventMessage from "./handlers/process-event.handler";

async function startDataProcessor(): Promise<void> {
  try {
    logger.info("Data Processor is running...");

    await MessageService.consume(
      EQueues.RAW_EVENTS,
      EQueues.EVENTS_DLQ,
      processEventMessage
    );
  } catch (error: any) {
    logger.error(`Data-processor : ${error.message}`);
    throw error;
  }
}

export default startDataProcessor;
