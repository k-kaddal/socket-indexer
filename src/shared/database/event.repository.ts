import DatabaseService from "./database.service";
import {EventSchema, TEvent} from "@shared/models";
import logger from "@shared/logger";

class EventRepository {
  async save(event: TEvent): Promise<void> {
    const validatedEvent = EventSchema.parse(event);
    const query = `
        INSERT INTO bridging_events (
          id, amount, token, to_chain_id, bridge_name, sender, receiver,
          metadata, block_number, transaction_hash, log_index, token_name, token_symbol, decimals, readable_amount
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `;

    try {
      await DatabaseService.query(query, [
        validatedEvent.id,
        validatedEvent.amount,
        validatedEvent.token,
        validatedEvent.toChainId,
        validatedEvent.bridgeName,
        validatedEvent.sender,
        validatedEvent.receiver,
        validatedEvent.metadata,
        validatedEvent.blockNumber,
        validatedEvent.transactionHash,
        validatedEvent.logIndex,
        validatedEvent.tokenName || null,
        validatedEvent.tokenSymbol || null,
        validatedEvent.decimals || null,
        validatedEvent.readableAmount || null,
      ]);
      logger.debug(`[database] : Event ${validatedEvent.id} saved`);
    } catch (error: any) {
      logger.error(`database : ${error.message}`);
      throw error;
    }
  }

  async getById(id: string): Promise<TEvent | null> {
    const query = `SELECT * FROM bridging_events WHERE id = $1`;

    try {
      const result = await DatabaseService.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0] as TEvent;
    } catch (error: any) {
      logger.error(`database : ${error.message}`);
      throw error;
    }
  }
}

export default new EventRepository();
