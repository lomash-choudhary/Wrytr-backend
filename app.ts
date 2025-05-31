import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(express.static("./public"));
app.use(express.json({ limit: process.env.JSON_PAYLOAD_LIMIT }));
app.use(
  express.urlencoded({ extended: true, limit: process.env.URL_PAYLOAD_LIMIT })
);
app.use(cors(
  {
    origin: "*",
    credentials:true
  }
))

import { userRouter } from "./routes/user.route";
import { serverHealthRouter } from "./routes/healthCheck.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";

app.use("/api/v1/server", serverHealthRouter);
app.use("/api/v1/user", userRouter);

/*
    this middleware acts as a catch-all thing for our code
    it will catch all the failed errors above so it should always be placed in the end 

    it will catch the errors

    A route handler calls next(error)

    An exception is thrown and caught by asyncHandler, which then calls next(error)
    
    An uncaught exception occurs in synchronous code
*/
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

export default app;
