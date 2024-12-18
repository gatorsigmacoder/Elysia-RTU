import { Elysia, t } from "elysia";
import { UserController } from "../controllers/user.controller";

export const Routes = (app: Elysia) => {
  const userController = new UserController();

  app.get("/users", userController.getUser);
  app.post("/users", ({ body }) =>
    userController.createUser(body as { name: string; email: string })
  );
};
