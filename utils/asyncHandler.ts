// import type { Request, Response, NextFunction } from "express";
// export const asyncHandler = (requestHandler: Function) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((error) =>
//       next(error)
//     );
//   };
// };


/*
    why we needed this high order function ?
    to catch the errors in async function and properly forward them to express error handling

    express doesnt automatically catch errors in async functions 

    without it if any promise failes then it will crash our server

    it eliminates our repetitive try/catch blocks in every route
*/
import type {Request, Response, NextFunction} from "express"

const asyncHandler = (fn: Function) => async(req:Request, res:Response, next:NextFunction) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        next(error) //if any async functin fails then this will call our errorhandler middleware
    }
}

export{
    asyncHandler
}