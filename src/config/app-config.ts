import * as dotenv from "dotenv";

dotenv.config();

interface ConfVar {
  app: {
    port: number;
    jwtSecret: string;
    appName: string;
  };
}

export class AppConfig {
  private readonly config: ConfVar;

  constructor() {
    this.config = {
      app: {
        port: parseInt(process.env.PORT || "3000", 10),
        jwtSecret: process.env.JWT_SECRET || "",
        appName: process.env.APP_NAME || "",
      },
    };
  }

  get<T extends keyof ConfVar>(key: T): ConfVar[T] {
    return this.config[key];
  }
}

export const appConfig = new AppConfig();
