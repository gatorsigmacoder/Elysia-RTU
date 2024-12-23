import { Elysia } from "elysia";
import { UserController } from "../controllers/user.controller";
import jwt from "@elysiajs/jwt";
import { appConfig } from "../../../config/app-config";
import { AuthController } from "../controllers/auth.contorller";
import { onlyUser } from "../../../middleware/OnlyUser";

export const Routes = (app: Elysia) => {
  const userController = new UserController();
  const authController = new AuthController();
  const appJwt = jwt({ name: "jwt", secret: appConfig.get("app").jwtSecret });

  app.get("/users/:id", userController.showUser);
  app.post("/users", userController.createUser);
  app.use(appJwt).post("/login", authController.signIn);
  app.use(onlyUser).get("/users", userController.getUser);
};
