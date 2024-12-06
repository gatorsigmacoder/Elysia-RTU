import { Elysia } from "elysia";
import { Routes } from "./app/http/routes/routes";

const app = new Elysia();

Routes(app);

app.listen(3000);

console.log("=================================================");
console.info(`🚂 Elysia is running on port ${app.server?.port}`);
console.log("=================================================");
