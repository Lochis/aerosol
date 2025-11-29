import type { User } from "./user.types";

export interface IChannel {
  _id?: string;
  name: string;
  owner?: {
    _id: User["_id"];
    tag: User["tag"];
    name: User["name"];
  };
  type: "channel" | "dm";
  members: User["_id"][]; // only user IDs
}
