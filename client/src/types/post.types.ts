export interface Post {
    id: string;
    author: {
        name: string;
        tag: string;
        avatar_url?: Buffer;
    };
    content: string;
    createdAt: string;
}
