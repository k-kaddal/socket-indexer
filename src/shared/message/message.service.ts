import Config from "@shared/config";
import logger from "@shared/logger";
import {EQueues} from "@shared/message";
import amqplib from "amqplib";

class MessageService {
  private connection: amqplib.Connection | undefined;
  private channel: amqplib.Channel | undefined;

  public async connect(): Promise<void> {
    if (this.connection) {
      logger.debug("RabbitMQ connection already established.");
      return;
    }

    try {
      const url = `amqp://${encodeURIComponent(
        Config.RABBITMQ_USER
      )}:${encodeURIComponent(Config.RABBITMQ_PASSWORD)}@${
        Config.RABBITMQ_HOST
      }:${Config.RABBITMQ_PORT}`;

      this.connection = await amqplib.connect(url);

      this.connection.on("close", async () => {
        logger.warn("RabbitMQ connection closed. Attempting to reconnect...");
        this.connection = undefined;
        this.channel = undefined;
        await this.connect();
      });

      this.connection.on("error", (err) => {
        logger.error("RabbitMQ connection error:", err);
        this.connection = undefined;
        this.channel = undefined;
      });

      this.channel = await this.createChannel();

      await this.assertQueue(EQueues.RAW_EVENTS, EQueues.EVENTS_DLQ);
      await this.assertQueue(EQueues.ENRICHED_EVENTS, EQueues.EVENTS_DLQ);
      await this.assertQueue(EQueues.EVENTS_DLQ);

      logger.info("RabbitMQ connected");
    } catch (error) {
      logger.error("Failed to connect to RabbitMQ:", error);
    }
  }

  private async assertQueue(queue: EQueues, dlq?: EQueues): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel is not established.");
    }

    await this.channel.assertQueue(queue, {
      durable: true,
      arguments: dlq
        ? {
            "x-dead-letter-exchange": "",
            "x-dead-letter-routing-key": dlq,
          }
        : undefined,
    });
  }

  public async createChannel(): Promise<amqplib.Channel> {
    if (!this.connection) {
      throw new Error("RabbitMQ connection is not established.");
    }
    return await this.connection.createChannel();
  }

  public async publish(queue: EQueues, message: any): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error("RabbitMQ channel is not established.");
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      logger.error("Failed to publish message:", error);
    }
  }

  public async consume(
    queue: EQueues,
    queueDLQ: EQueues,
    onMessage: (msg: amqplib.Message) => Promise<void>
  ): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error("RabbitMQ channel is not established.");
      }

      // Ensure queue is asserted
      await this.assertQueue(queue, queueDLQ);

      this.channel.consume(
        queue,
        async (msg) => {
          if (msg !== null) {
            try {
              await onMessage(msg);
              this.channel!.ack(msg);
            } catch (error) {
              logger.error("Error processing message:", error);
              this.channel!.nack(msg, false, false); // Move message to DLQ
            }
          }
        },
        {noAck: false}
      );
    } catch (error) {
      logger.error("Failed to consume messages:", error);
    }
  }
}

export default new MessageService();
