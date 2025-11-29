export interface IMessage {
    _id: string;
    channelId: string;
    author: {
        _id: string;
        name: string;
        tag: string;
        avatar_url?: string;
    };
    msg: string;
    createdAt: string;
};
