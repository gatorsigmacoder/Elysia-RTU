import { Logger } from "../../helpers/logger";
import { Response } from "../../helpers/response";
import { UserModel } from "../models/user.model";

export class UserController {
  private user: UserModel;

  constructor() {
    this.user = new UserModel();
  }

  getUser = () => {
    // Get data from the model
    const data = this.user.getData();

    // Return response
    Logger.info(`Request to /users received at ${new Date().toISOString()}`);
    return Response.success(data, "Data exist");
  };
}
