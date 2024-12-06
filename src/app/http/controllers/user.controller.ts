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
    return Response.success(data, "Data exist");
  };
}
