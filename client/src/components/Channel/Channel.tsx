import Avatar from "boring-avatars";
import type { Channel } from "./types/channel.types";
export default function Channel({
  channel,
  isUserOwner,
  onOpenChannel,
}: {
  channel: Channel;
  isUserOwner: boolean;
  onOpenChannel: (channel: Channel) => void;
}) {
  const isDM = channel.type === "dm";
  return (
    <button className="btn btn-outline rounded-xl" onClick={() => onOpenChannel(channel)}>
      <Avatar
        size={32}
        name={isUserOwner ? channel.members[0].name : channel.owner.tag}
        variant="beam"
        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      />
      <span className="text-base font-semibold">
        {isDM ? "@" : "#"}
        {isDM ? (isUserOwner ? channel.members[0].tag : channel.owner.tag) : channel.name}
      </span>
    </button>
  );
}
