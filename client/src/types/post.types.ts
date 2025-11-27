export type Post = {
  _id: string;
  content: string;

  author: {
    _id: string;
    name: string;
    tag: string;
  };

  createdAt: string;
  updatedAt: string;

  // Like system
  likes?: number;
  likedBy?: string[];
};
