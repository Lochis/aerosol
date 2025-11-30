export interface User {
    _id: string;
    email?: string;
    name: string;
    tag: string;
    avatar_url?: string;
    createdAt?: string;
}

export type ReducedUsers = {
    _id: string;
    tag: string;
    name: string;
  };