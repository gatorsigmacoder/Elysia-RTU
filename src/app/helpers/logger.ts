import winston from "winston";

export class Logger {
  private static logger: winston.Logger;

  private constructor() {}

  public static getLogger(): winston.Logger {
    if (!this.logger) {
      this.logger = winston.createLogger({
        level: "info",
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp(),
              winston.format.simple()
            ),
          }),
          new winston.transports.File({ filename: "combined.log" }),
        ],
      });
    }
    return this.logger;
  }

  // Info log
  public static info(message: string): void {
    this.getLogger().info(message);
  }

  // Other log levels can be added similarly
  public static warn(message: string): void {
    this.getLogger().warn(message);
  }

  public static error(message: string): void {
    this.getLogger().error(message);
  }
}
