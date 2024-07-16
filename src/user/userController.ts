import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

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
    //process

    //password--hash
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = userModel.create({
        name,
        email,
        password: hashedPassword,
    });
    //token generation:JWT
    const token = sign(
        {
            sub: (await newUser)._id,
        },
        config.JWTSECRET as string,
        { expiresIn: "7d", algorithm: "HS256" }
    );
    //response
    return res.json({
        accessToken: token,
    });
};

export { createUser };
