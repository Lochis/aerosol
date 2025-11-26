import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";
import type { Request as JWTRequest } from "express-jwt"
import type { Response } from 'express';
import type { Types } from 'mongoose';

import config from '../config/config.ts';

export async function login(req: JWTRequest, res: Response) {
    console.log("Login request received:", req.body);
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user) {
            return res.status(400).json({
                "status": "error",
                "error": {
                    "code": "EMAIL_NOT_FOUND",
                    "message": "No account found with that email."
                }
            });
        }
        // call user's authenticate method if available
        const authFn = (user as any).authenticate;
        if (typeof authFn === "function") {
            // use call to preserve method's this context - Mongoose instance methods
            if (!authFn.call(user, req.body.password)) {
                return res.status(401).json({
                    "status": "error",
                    "error": {
                        "code": "BAD_PASSWORD",
                        "message": "Email and password don't match."
                    }
                });
            }
        }

        return authorizeUser(res, user._id);
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            "status": "error",
            "error": { "message": err }
        });
    }
}

function authorizeUser(res: Response, sub: Types.ObjectId) {
    const expiresIn = 900;
    const accessToken = jwt.sign({ sub }, config.jwtSecret, { expiresIn });
    const refreshToken = jwt.sign(
        { sub, refresh: true },
        config.jwtRefreshSecret,
        { expiresIn: 86400 }
    );

    return res.json({
        sub,
        accessToken,
        refreshToken,
        expiresIn,
        tokenType: "Bearer",
    });
}

export async function signup(req: JWTRequest, res: Response) {

    try {
        // normalize email and name to lowercase
        const email = req.body.email.trim().toLowerCase();

        // check if user with the same email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                error: {
                    code: "DUPLICATE_EMAIL",
                    message: "Email is already registered"
                }
            });
        }

        req.body.email = email;

        const user = new User(req.body);
        console.log("User object before save:", user);

        // Validate explicitly to get validation errors before DB write
        await user.validate().catch(validationErr => {
            console.error("Validation errors:", validationErr);
            throw { type: "VALIDATION", details: validationErr.errors };
        });

        // actual save
        console.log("Attempting to save user to DB...");
        await user.save();
        console.log("User saved successfully:", user._id);


        return res.status(201).json({
            "status": "ok",
            "data": { userId: user._id }
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "status": "error",
            "error": { "message": err }
        })
    }
}

export const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    requestProperty: 'auth',
})

// Can this be merged into the refresh function?
export const requireRefresh = expressjwt({
    secret: config.jwtRefreshSecret,
    algorithms: ["HS256"],
    requestProperty: 'auth',
})

export async function refresh(req: JWTRequest, res: Response) {
    // In case the client accidentally sends their access token,
    // ensure it has a refresh private claim defined
    if (!req.auth?.refresh || !req.auth?.sub) return res.status(400).json({
        status: "error",
        error: {
            code: "INVALID_REFRESH_TOKEN",
            message: "Refresh token is invalid.",
        }
    })

    const user = await User.findById(req.auth.sub)
    if (!user) return res.status(404).json({ error: "User not found" })
    return authorizeUser(res, user._id)
}

/* unused at the moment

const hasAuthorization = (req: JWTRequest, res: Response, next: Function) => {
    const authorized = req.profile && req.auth
        && req.profile._1d == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}
    */
