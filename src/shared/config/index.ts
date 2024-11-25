import dotenv from "dotenv";

dotenv.config();

class Config {
  private static getEnvVariable(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue;
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  public static readonly WS_RPC_URL: string =
    Config.getEnvVariable("WS_RPC_URL");

  public static readonly HTTP_RPC_URL: string =
    Config.getEnvVariable("HTTP_RPC_URL");

  public static readonly SOCKET_GATE_ADDRESS: string = Config.getEnvVariable(
    "SOCKET_GATE_ADDRESS"
  );

  public static readonly DB_USER: string = Config.getEnvVariable("DB_USER");
  public static readonly DB_PASSWORD: string =
    Config.getEnvVariable("DB_PASSWORD");
  public static readonly DB_NAME: string = Config.getEnvVariable("DB_NAME");
  public static readonly DB_HOST: string = Config.getEnvVariable("DB_HOST");
  public static readonly DB_PORT: number = parseInt(
    Config.getEnvVariable("DB_PORT"),
    10
  );

  public static readonly RABBITMQ_HOST: string =
    Config.getEnvVariable("RABBITMQ_HOST");
  public static readonly RABBITMQ_PORT: number = parseInt(
    Config.getEnvVariable("RABBITMQ_PORT"),
    10
  );
  public static readonly RABBITMQ_MANAGEMENT_PORT: number = parseInt(
    Config.getEnvVariable("RABBITMQ_MANAGEMENT_PORT"),
    10
  );
  public static readonly RABBITMQ_QUEUE: string =
    Config.getEnvVariable("RABBITMQ_QUEUE");
  public static readonly RABBITMQ_USER: string =
    Config.getEnvVariable("RABBITMQ_USER");
  public static readonly RABBITMQ_PASSWORD: string =
    Config.getEnvVariable("RABBITMQ_PASSWORD");

  // App Config
  public static readonly PORT: number = parseInt(
    Config.getEnvVariable("PORT"),
    10
  );

  public static readonly API_PORT: number = parseInt(
    Config.getEnvVariable("API_PORT"),
    10
  );

  public static readonly NODE_ENV: string = Config.getEnvVariable("NODE_ENV");
}

export default Config;
