import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { appConfig } from "../config/app-config";
import { UserModel } from "../app/http/models/user.model";
import { ObjectId } from "mongodb";

const onlyUser = (app: Elysia) =>
  app
    .use(
      jwt({
        name: appConfig.get("app").appName,
        secret: appConfig.get("app").jwtSecret!,
      })
    )
    .derive(async ({ jwt, headers, set }: any) => {
      const accessToken = headers["authorization"]?.split(" ")[1];
      if (!accessToken) {
        // handle error for access token is not available
        set.status = "Unauthorized";
        throw new Error("Access token is missing");
      }
      const jwtPayload = await jwt.verify(accessToken);
      if (!jwtPayload) {
        // handle error for access token is tempted or incorrect
        set.status = "Forbidden";
        throw new Error("Access token is invalid");
      }

      const userId = jwtPayload.sub;
      const user = await new UserModel().findUserById(userId);

      if (!user) {
        // handle error for user not found from the provided access token
        set.status = "Forbidden";
        throw new Error("Access token is invalid");
      }

      return {
        user,
      };
    });

export { onlyUser };
