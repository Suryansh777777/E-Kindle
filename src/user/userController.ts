import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";

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

    //password--hash
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    //process

    //response
    return res.json({ message: "User created succesfully" });
};

export { createUser };
