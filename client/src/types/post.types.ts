export interface Post {
    id: string;
    author: {
        _id: string;
        name: string;
        tag: string;
        avatar_url?: string | null; // IMPORTANT : string, pas Buffer !
    };
    content: string;
    createdAt: string;
}