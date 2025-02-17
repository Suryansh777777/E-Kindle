import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

// Global error handler should be at last of all routes
const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statuscode = err.statusCode || 500;
    return res.status(statuscode).json({
        message: err.message,
        errorStack: config.nodeenv == "development" ? err.stack : "",
    });
};
export default globalErrorHandler;
