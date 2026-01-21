import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      message: `Route ${req.originalUrl} not found`,
    },
  });
};
