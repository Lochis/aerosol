import Avatar from "boring-avatars";
import type { IChannel } from "../../types/channel.types.ts";
export default function Channel({
  channel,
  isUserOwner,
  onOpenChannel,
}: {
  channel: IChannel;
  isUserOwner: boolean;
  onOpenChannel: (channel: IChannel) => void;
}) {
  const isDM = channel.type === "dm";

   const firstMember = channel.members[0];
   
  const isMemberObject = typeof firstMember === "object" && firstMember !== null && "name" in firstMember && "tag" in firstMember;
  const avatarName = isUserOwner
    ? isMemberObject
      ? (firstMember as { tag?: string }).tag ?? channel.owner?.tag
      : channel.owner?.tag
    : "";


    const dmName = isUserOwner
    ? isMemberObject
    ? firstMember.tag
    : firstMember?.tag : channel.owner?.tag;

  const channelName = isDM ? dmName : channel.name;

  return (
    <button className="btn btn-outline rounded-xl" onClick={() => onOpenChannel(channel)}>
      {isDM && <Avatar
        size={32}
        name={avatarName}
        variant="beam"
        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      />}
      <span className="text-base font-semibold">
        {isDM ? "@" : "#"}
        {channelName}
      </span>
    </button>
  );
}
