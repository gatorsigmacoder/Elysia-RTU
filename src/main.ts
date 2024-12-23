import { Elysia } from "elysia";
import { Routes } from "./app/http/routes/routes";
import { appConfig } from "./config/app-config";

const app = new Elysia();

const port = appConfig.get("app").port;

Routes(app);

app.listen(port);

console.log("=================================================");
console.info(`🚂 Elysia is running on port ${port}`);
console.log("=================================================");
