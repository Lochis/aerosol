import type { ReducedUsers, User } from "./user.types";

export type ChannelMember = User | ReducedUsers | User["_id"];

export interface IChannel {
  _id?: string;
  name: string;
  owner?: {
    _id: User["_id"];
    tag: User["tag"];
    name: User["name"];
  };
  type: "channel" | "dm";
  members: ChannelMember[]; // only user IDs
}
