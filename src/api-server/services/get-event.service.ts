import {TEvent} from "@shared/models";
import eventRepository from "@shared/database/event.repository";
import logger from "@shared/logger";

export const getEventById = async (id: string): Promise<TEvent | null> => {
  try {
    const event = await eventRepository.getById(id);
    if (!event) {
      return null;
    }
    return event;
  } catch (error) {
    logger.error("Error getting event by id:", error);
    throw error;
  }
};
