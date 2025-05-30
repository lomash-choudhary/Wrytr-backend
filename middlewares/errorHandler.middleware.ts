import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

/*

    why we needed this?
    so that we can have a centralized way to handle errors in our application 

    if we didnt do this then 

    the express will use its default basic error page which will be of html which we dont want we want a proper json response

    what express does is that
    when any route or middleware throws any error then express skips all the regular middleware or routes and directly goes straight to the error-handling middleware

    An error middleware has 4 parameters (err, req, res, next) by which express identifies it is a error middleware

    our error will only be of two types
    normal Error and one Error which was caught by ApiError so we use either one of them

*/
const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //the default error value
  let statusCode = 500;
  let message = "Something went wrong";
  let error = [];
  let success = false;

  //check if the err which came is an instane of our ApiError class
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    error = err.error;
    success = err.success;
  }

  //return consistent json reponse
  return res.status(statusCode).json({
    success,
    message,
    error,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { errorHandler };
