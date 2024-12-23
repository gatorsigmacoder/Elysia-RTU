import { ObjectId } from "mongodb";
import { IResponseUser } from "../../../../my_packages/seeder/interfaces/IResponseUser";
import { IUser } from "../../../../my_packages/seeder/interfaces/IUser";
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

  /**
   * Inserts a new user into the database.
   * @param {any} userData The data of the user to insert.
   * @returns {Promise<any>} The result of the insert operation.
   */
  async createData(userData: any): Promise<any> {
    try {
      const db = await this.dbConfig.connect(); // Connect to the database
      const collection = db.collection("users"); // Use the 'users' collection
      const result = await collection.insertOne(userData); // Insert the document
      console.info("Data successfully inserted:", result.insertedId);
      return result; // Return the result of the insert operation
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error; // Rethrow the error for handling by the caller
    } finally {
      await this.dbConfig.close(); // Ensure the connection is closed
    }
  }

  async findUserByEmail(email: string): Promise<IResponseUser | null> {
    try {
      const db = await this.dbConfig.connect(); // Connect to the database
      const collection = db.collection("users"); // Use the 'users' collection
      const result = await collection.findOne<IResponseUser>({ email });
      return result || null; // Return the result of the insert operation
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error; // Rethrow the error for handling by the caller
    } finally {
      await this.dbConfig.close(); // Ensure the connection is closed
    }
  }

  async findUserById(id: string): Promise<IResponseUser | null> {
    try {
      const db = await this.dbConfig.connect(); // Connect to the database
      const collection = db.collection("users"); // Use the 'users' collection
      const result = await collection.findOne<IResponseUser>({
        _id: new ObjectId(id),
      });
      return result || null; // Return the result of the insert operation
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error; // Rethrow the error for handling by the caller
    } finally {
      await this.dbConfig.close(); // Ensure the connection is closed
    }
  }
}
