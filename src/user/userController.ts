import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !password || !email) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    //Database call
    const user = await userModel.findOne({
        email,
    });
    if (user) {
        const error = createHttpError(
            400,
            "User Already exists with this email"
        );
        return next(error);
    }
    return res.json({ message: "User created succesfully" });
};

export { createUser };
