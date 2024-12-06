import { Elysia } from "elysia";
import { UserController } from "../controllers/user.controller";

export const Routes = (app: Elysia) => {
  const userController = new UserController();

  app.get("/users", userController.getUser);
};
