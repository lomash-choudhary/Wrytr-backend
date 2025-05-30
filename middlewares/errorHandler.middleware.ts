import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error: ', err);
  
  // Default error values
  let statusCode = 500;
  let message = 'Something went wrong';
  let errors = [];
  let success = false;
  
  // Check if error is our custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message || 'Error occurred';
    errors = err.error;
    success = err.success;
  }
  
  // Return consistent JSON response
  return res.status(statusCode).json({
    success,
    message,
    errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export { errorHandler };