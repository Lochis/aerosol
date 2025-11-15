import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";

import config from '../config/config.ts';

const me = async (req, res) => {
    try {
        const userId = req.auth.sub;
        // if no userId in token, return invalid token error
        if (!userId) {
            return res.status(401).json({ "code": "INVALID_TOKEN" });
        }

        const user = await User.findById(userId).select('_id email name createdAt');
        return res.json({
            "status": "ok",
            "data": {
                "user": {
                    "id": user._id,
                    "email": user.email,
                    "name": user.name,
                    "display_name": user.display_name,
                    "avatar_url": user.avatar_url.toString('base64'),
                    "createdAt": user.createdAt
                },
            }
        });
    } catch (err) {
        return res.status(401).json({ "code": "INVALID_TOKEN" });
    }
}

const signin = async (req, res) => {
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

        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({
                "status": "error",
                "error": {
                    "code": "BAD_PASSWORD",
                    "message": "Email and password don't match."
                }
            });
        }
        const expiresIn = 900;
        const accessToken = jwt.sign({ sub: user._id }, config.jwtSecret, { expiresIn });

        return res.json({
            accessToken: accessToken,
            tokenType: "Bearer",
            expiresIn: expiresIn,
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            "status": "error",
            "error": { "message": err }
        });
    }
}

const signup = async (req, res) => {

    try {
        // normalize email and name to lowercase
        const email = req.body.email.trim().toLowerCase();
        const name = req.body.name.trim().toLowerCase();

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
        req.body.name = name;

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
        return res.status(400).json({
            "status": "error",
            "error": { "message": err }
        })
    }
}


const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth
        && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

export default { signin, signup, me, requireSignin, hasAuthorization }

