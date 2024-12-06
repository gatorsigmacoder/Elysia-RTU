import * as dotenv from "dotenv";

dotenv.config();

interface AppConfig {
  app: {
    port: number;
  };
}

export class ConfigService {
  private readonly config: AppConfig;

  constructor() {
    this.config = {
      app: {
        port: parseInt(process.env.PORT || "3000", 10),
      },
    };
  }

  get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    return this.config[key];
  }
}

export const configService = new ConfigService();
