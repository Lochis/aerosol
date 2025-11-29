import type { User } from "./user.types";

export interface IChannel {
  _id?: string;
  name: string;
  type: "channel" | "dm";
  members: User["_id"][]; // only user IDs
}
