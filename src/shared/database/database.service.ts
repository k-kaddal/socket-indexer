import {Pool} from "pg";
import Config from "../config";
import logger from "../logger";

class DatabaseService {
  private pool: Pool | null = null;

  private initializePool(): void {
    if (!this.pool) {
      this.pool = new Pool({
        user: Config.DB_USER,
        host: Config.DB_HOST,
        database: Config.DB_NAME,
        password: Config.DB_PASSWORD,
        port: Config.DB_PORT,
      });

      this.pool.once("connect", () => {
        logger.info("Postgres connected");
      });

      this.pool.on("error", (err: any) => {
        logger.error("Error with Postgres client", err);
        process.exit(-1);
      });
    }
  }

  public async query(text: string, params?: any[]): Promise<any> {
    this.initializePool(); // Ensure the pool is initialized
    return this.pool!.query(text, params);
  }

  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      logger.info("Postgres connection closed");
    }
  }
}
export default new DatabaseService();
