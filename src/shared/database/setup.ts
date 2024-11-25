import DatabaseService from "./database.service";
import logger from "../logger";

const createEventsTableQuery = `
CREATE TABLE IF NOT EXISTS bridging_events (
    id VARCHAR(300) PRIMARY KEY,
    amount VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    token_name VARCHAR(255),
    token_symbol VARCHAR(255),
    decimals INT,
    to_chain_id INT NOT NULL,
    bridge_name VARCHAR(255) NOT NULL,
    sender VARCHAR(255) NOT NULL,
    receiver VARCHAR(255) NOT NULL,
    metadata TEXT NOT NULL,
    block_number INT NOT NULL,
    transaction_hash VARCHAR(255) NOT NULL,
    log_index INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(transaction_hash, log_index)
);
`;

export const setupDatabase = async () => {
  try {
    await DatabaseService.query(createEventsTableQuery);
    logger.info("Database tables are set up.");
  } catch (error) {
    logger.error("Error creating table `bridging_events`:", error);
    process.exit(1);
  }
};
