import type { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
    tag: string;
    createdAt: Date;
    avatar_url: Buffer;
    passwordHash: string;

    // virtual
    password: string;
    _password: string;
}
