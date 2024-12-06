import { Elysia } from "elysia";
import { Routes } from "./app/http/routes/routes";
import { configService } from "./config/app-config";

const app = new Elysia();

const port = configService.get("app").port;

Routes(app);

app.listen(port);

console.log("=================================================");
console.info(`🚂 Elysia is running on port ${port}`);
console.log("=================================================");
