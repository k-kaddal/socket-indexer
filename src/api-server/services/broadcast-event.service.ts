import {Response} from "express";
import {TEvent} from "@shared/models";
import logger from "@shared/logger";

const clients: Set<Response> = new Set();

export const addClient = (client: Response): void => {
  clients.add(client);
};

export const removeClient = (client: Response): void => {
  clients.delete(client);
};

export const broadcastEvent = (event: TEvent): void => {
  const eventData = `data: ${JSON.stringify(event)}\n\n`;
  clients.forEach((client) => {
    try {
      client.write(eventData);
    } catch (error) {
      clients.delete(client);
      logger.error("Error broadcasting to a client:", error);
    }
  });
};
