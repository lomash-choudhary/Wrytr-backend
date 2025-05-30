import dotenv from "dotenv"
dotenv.config(
    {
        path:"./.env"
    }
)
import express from "express"

const app = express();
app.use(express.json())
app.use(express.static("./public"))
app.use(express.json({limit: process.env.JSON_PAYLOAD_LIMIT}))
app.use(express.urlencoded({extended:true, limit:process.env.URL_PAYLOAD_LIMIT}))

import { userRouter } from "./routes/user.route";
import { serverHealthRouter } from "./routes/healthCheck.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";

app.use("/api/v1/server", serverHealthRouter)
app.use("/api/v1/user", userRouter)


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});


export default app;

