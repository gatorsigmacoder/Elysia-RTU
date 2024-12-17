import { DatabaseConfig } from "../../../config/database-config";

export class UserModel {
  private dbConfig: DatabaseConfig;

  constructor() {
    this.dbConfig = new DatabaseConfig(); // Initialize the database config
  }

  /**
   * Fetches user data from the database.
   * @returns {Promise<any[]>} Array of user data.
   */
  async getData(): Promise<any[]> {
    try {
      const db = await this.dbConfig.connect(); // Connect to the database
      const collection = db.collection("users"); // Use the 'users' collection
      const data = await collection.find({}).toArray(); // Fetch all documents
      return data; // Return the fetched data
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error; // Rethrow the error for handling by the caller
    } finally {
      await this.dbConfig.close(); // Ensure the connection is closed
    }
  }
}
