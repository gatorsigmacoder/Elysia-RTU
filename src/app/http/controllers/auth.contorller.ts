import { appConfig } from "../../../config/app-config";
import { Response } from "../../helpers/response";
import { UserModel } from "../models/user.model";

export class AuthController {
  private userModel = new UserModel();

  public signIn = async ({ jwt, body, set }: any) => {
    const { email, password } = body;
    const user = await this.userModel.findUserByEmail(email);
    if (!user) {
      return Response.error(set, null, "Password or email is invalid", 400);
    }
    const hash = user?.password;

    const isMatch = await Bun.password.verify(password, hash);

    if (!isMatch) {
      return Response.error(set, null, "Password or email is invalid", 400);
    }

    const { password: _, ...userWithoutPassword } = user;

    const jwtResult = await jwt.sign(
      {
        userWithoutPassword,
        iat: Math.floor(Date.now() / 1000),
        sub: userWithoutPassword._id,
        iss: appConfig.get("app").appName,
      },
      { expiresIn: "2m" }
    );

    const data = {
      accessToken: jwtResult,
    };

    return Response.success(set, data, "OK");
  };

  public verifyToken = async ({ jwt, set, cookie: { auth } }: any) => {
    const verify = await jwt.verify(auth.value);
    if (!verify) {
      set.status = 401;
      return "Unauthorized";
    }
    return `Hello ${verify.name}`;
  };
}
