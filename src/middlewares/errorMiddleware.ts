import { Request, Response, NextFunction } from 'express';
import logger from './loggingMiddleware';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const errorResponse = {
        error: err.message || 'Internal Server Error',
    };
    logger.error(`${errorResponse.error} - ${req.method} ${req.url}`);

    res.status(status).json(errorResponse);
};

