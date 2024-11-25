import MessageService from "@shared/message/message.service";
import {EQueues} from "@shared/message";
import {Message} from "amqplib";
import {broadcastEvent} from "./broadcast-event.service";
import logger from "@shared/logger";

export async function consumeEnrichedEvent(): Promise<void> {
  await MessageService.consume(
    EQueues.ENRICHED_EVENTS,
    EQueues.EVENTS_DLQ,
    async (msg: Message) => {
      try {
        const enrichedEvent = JSON.parse(msg.content.toString());
        broadcastEvent(enrichedEvent);
        logger.debug(`[api-server]: Event ${enrichedEvent.id} broadcasted`);
      } catch (error) {
        logger.error("Error broadcasting enriched event:", error);
      }
    }
  );
}
