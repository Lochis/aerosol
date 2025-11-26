export interface Post {
    id: string;
    author: {
        _id: string;
        name: string;
        tag: string;
        avatar_url?: string;
    };
    content: string;
    createdAt: string;
}
