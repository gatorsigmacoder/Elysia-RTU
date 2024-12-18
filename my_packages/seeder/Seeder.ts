import { argv } from "bun";
import { Logger } from "../../src/app/helpers/logger";
import { IMigration } from "./interfaces/IMigration";
import { DatabaseConfig } from "../../src/config/database-config";
import { loggers } from "winston";

export abstract class Seeder implements IMigration {
  protected startTime: number;
  protected dbConfig: DatabaseConfig;

  constructor() {
    this.startTime = performance.now();
    this.dbConfig = new DatabaseConfig();
  }

  public abstract run(): Promise<void>;

  protected async preCommand(): Promise<void> {
    const clearArgs = ["--clear", "--cl", "--thanos-snap"];
    const seedArgs = ["--seed", "--populate", "--pop"];
    if (process.argv.some((arg) => clearArgs.includes(arg))) {
      try {
        const db = await this.dbConfig.connect();
        const collections = await db.collections();

        for (const collection of collections) {
          await collection.deleteMany({});
          Logger.info(
            `Collection ${collection.collectionName} cleared successfully.`
          );
        }
      } catch (error: unknown) {
        Logger.error(`Error clearing database: ${error}`);
        throw error;
      } finally {
        await this.dbConfig.close();
      }
    }

    if (!process.argv.some((arg) => seedArgs.includes(arg))) {
      Logger.info("No data will be seed");
      process.exit(0);
    }
  }

  protected logExecutionTime(): void {
    const endTime = performance.now();
    const executionTime = endTime - this.startTime;
    Logger.info(`Migration Execution Time: ${executionTime.toFixed(2)}ms`);
  }

  protected handleError(error: Error): void {
    Logger.error(`Migration failed: ${error}`);
    process.exit(1);
  }
}
