import { Logger } from "../../helpers/logger";
import { Response } from "../../helpers/response";
import { UserModel } from "../models/user.model";

export class UserController {
  private user: UserModel;

  constructor() {
    this.user = new UserModel();
  }

  getUser = async ({ set }: any) => {
    // Get data from the model
    const data = await this.user.getData();

    // Return response
    Logger.info(`Request to /users received at ${new Date().toISOString()}`);
    return Response.success(set, data, "Data exist");
  };

  showUser = async ({ jwt, set, params }: any) => {
    const _id = params;

    // Get data from the model
    const data = await this.user.findUserById(_id);

    // Return response
    Logger.info(`Request to /users received at ${new Date().toISOString()}`);
    return Response.success(set, data, "Data exist");
  };

  createUser = async ({ set, body }: any) => {
    const { name, username, email, password } = body;

    if (!name || typeof name !== "string") {
      return Response.error(set, null, "Invalid or missing 'name' field", 400);
    }

    if (!password || typeof password !== "string") {
      return Response.error(
        set,
        null,
        "Invalid or missing 'password' field",
        400
      );
    }

    if (!username || typeof username !== "string") {
      return Response.error(
        set,
        null,
        "Invalid or missing 'username' field",
        400
      );
    }

    if (!email || typeof email !== "string" || !this.isValidEmail(email)) {
      return Response.error(set, null, "Invalid or missing 'email' field", 400);
    }

    let hashedPassword = "";
    try {
      hashedPassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4,
      });
    } catch (error: unknown) {
      Logger.error(`Error hashing password: ${error}`);
      return Response.error(set, null, "Failed to hash password", 500);
    }

    try {
      let data = {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      };

      const res = await this.user.createData(data);
      return Response.success(set, res, "Created", 201);
    } catch (error: unknown) {
      Logger.error(`Error creating user: ${error}`);
      return Response.error(set, null, "Failed to create user", 500);
    }
  };

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
