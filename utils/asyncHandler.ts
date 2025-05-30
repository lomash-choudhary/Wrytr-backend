import type { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error); // This passes the error to Express's error handling middleware
  }
};

export { asyncHandler };