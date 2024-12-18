import { Logger } from "../../helpers/logger";
import { Response } from "../../helpers/response";
import { UserModel } from "../models/user.model";

export class UserController {
  private user: UserModel;

  constructor() {
    this.user = new UserModel();
  }

  getUser = async () => {
    // Get data from the model
    const data = await this.user.getData();

    // Return response
    Logger.info(`Request to /users received at ${new Date().toISOString()}`);
    return Response.success(data, "Data exist");
  };

  createUser = async (options: { name: string; email: string }) => {
    const { name, email } = options;

    if (!name || typeof name !== "string") {
      return Response.error(null, "Invalid or missing 'name' field", 400);
    }

    if (!email || typeof email !== "string" || !this.isValidEmail(email)) {
      return Response.error(null, "Invalid or missing 'email' field", 400);
    }

    try {
      let data = {
        name: name,
        email: email,
      };

      const res = await this.user.createData(data);
      return Response.success(res, "Created", 201);
    } catch (error: unknown) {
      Logger.error(`Error creating user: ${error}`);
      return Response.error(null, "Failed to create user", 500);
    }
  };

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
