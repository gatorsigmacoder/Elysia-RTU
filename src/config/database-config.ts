import { Db, MongoClient, MongoClientOptions } from "mongodb";

export class DatabaseConfig {
  private client: MongoClient;
  private dbName: string;
  private db?: Db; // Mark as optional, as it might not be initialized immediately
  private isConnected: boolean = false; // Custom connection flag

  constructor() {
    const uri = process.env.MONGODB_URI as string; // Retrieve URI from .env
    const dbName = process.env.MONGODB_DB_NAME as string; // Retrieve DB name from .env
    const user = process.env.MONGODB_USER as string; // Retrieve username from .env
    const password = process.env.MONGODB_PASSWORD as string; // Retrieve password from .env

    if (!uri || !dbName || !user || !password) {
      throw new Error(
        "MongoDB URI, database name, username, or password is missing in environment variables."
      );
    }

    // Include authentication details in connection options
    const options: MongoClientOptions = {
      auth: { username: user, password: password },
      authSource: process.env.MONGODB_AUTH_SOURCE || "admin", // Optional: specify the authentication database (default: "admin")
    };

    this.client = new MongoClient(uri, options);
    this.dbName = dbName;
  }

  /**
   * Connects to the MongoDB database.
   * @returns {Promise<Db>} The connected database instance.
   */
  async connect(): Promise<Db> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
    }
    this.db = this.client.db(this.dbName);

    // Check if the database exists
    try {
      const collections = await this.db.listCollections().toArray();
      console.info(
        `Connected to database "${
          this.dbName
        }". Available collections: ${collections.map((col) => col.name)}`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Error fetching collections for database "${this.dbName}":`,
          error.message
        );
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error;
    }

    return this.db;
  }

  /**
   * Closes the MongoDB connection.
   * @returns {Promise<void>}
   */
  async close(): Promise<void> {
    if (this.isConnected) {
      await this.client.close();
      this.isConnected = false;
    }
  }
}
