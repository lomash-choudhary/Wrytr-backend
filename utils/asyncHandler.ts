import type { Request, Response, NextFunction } from "express"
export const asyncHandler = (requestHandler:Function) => {
    return (req:Request, res:Response, next:NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
    }
}