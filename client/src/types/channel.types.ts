import { User } from "./user.types";

export interface Channel {
  _id: string;
  name: string;
  type: "channel" | "dm";
  members: User["_id"][]; // only user IDs
}
