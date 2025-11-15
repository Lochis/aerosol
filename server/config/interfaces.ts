export interface IUser {
    email: string;
    name: string;
    display_name: string;
    createdAt: Date;
    avatar_url: Buffer;
    password: string;
    authenticate: (plainText: string) => boolean;
}