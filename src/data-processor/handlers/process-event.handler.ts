import logger from "@shared/logger";
import {TEvent, TRawEvent} from "@shared/models";
import enrichEvent from "../services/enrich-event.service";
import eventRepository from "@shared/database/event.repository";
import {Message} from "amqplib";
import MessageService from "@shared/message/message.service";
import {EQueues} from "@shared/message";

async function processEventMessage(msg: Message): Promise<void> {
  try {
    const rawEvent: TRawEvent = JSON.parse(msg.content.toString());
    const enrichedEvent: TEvent = await enrichEvent(rawEvent);

    await Promise.all([
      eventRepository.save(enrichedEvent),
      MessageService.publish(EQueues.ENRICHED_EVENTS, enrichedEvent),
    ]);

    logger.debug(`[data-processor]: Event ${enrichedEvent.id} processed`);
  } catch (error: any) {
    logger.error(`data-processor : ${error.message}`);
    throw error;
  }
}

export default processEventMessage;
