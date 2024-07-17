import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bookModel from "/bookModel";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
};
export { createBook };
