import { Router } from "express";
import { serverHealthController } from "../controllers/healthCheck.controller";

const serverHealthRouter = Router();

serverHealthRouter.route("/check").get(serverHealthController);

export { serverHealthRouter };
