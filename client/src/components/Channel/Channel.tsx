import Avatar from "boring-avatars";
import type { Channel } from "./types/channel.types";
export default function Channel({
  channel,
  onOpen,
}: {
  channel: Channel;
  onOpen: (channel: Channel) => void;
}) {
  const isDM = channel.type === "dm";
  return (
    <button className="btn btn-outline rounded-xl" onClick={() => onOpen(channel)}>
      <Avatar
        size={32}
        name={channel.members[0].name}
        variant="beam"
        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      />
      <span className="text-base font-semibold">
        {isDM ? "@" : "#"}
        {isDM ? channel.members[0].tag : channel.name}
      </span>
    </button>
  );
}
