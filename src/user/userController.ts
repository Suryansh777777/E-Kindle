import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !password || !email) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    //Database call
    try {
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
    } catch (error) {
        return next(createHttpError(500, "Error while getting user"));
    }

    //process

    //password--hash
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser: User;
    try {
        newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
    } catch (error) {
        return next(createHttpError(500, "Error while creating the User"));
    }

    try {
        //token generation:JWT
        const token = sign(
            {
                sub: newUser._id,
            },
            config.JWTSECRET as string,
            { expiresIn: "7d", algorithm: "HS256" }
        );
        //response
        return res.json({
            accessToken: token,
        });
    } catch (error) {
        return next(createHttpError(500, "Error while creating the token"));
    }
};

export { createUser };
