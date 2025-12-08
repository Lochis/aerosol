import type { IMessage } from "../../types/message.types.ts";
import type { IChannel } from "../../types/channel.types.ts";
import Avatar from "boring-avatars";
import SendIcon from "../icons/SendIcon.tsx";
import { useEffect, useRef, useState } from "react";
import type { User } from "../../types/user.types.ts";

export default function ChatModal({
  activeChat,
  modalID,
  sendMessage,
  messages,
  userId,
  deleteChannel,
}: {
  activeChat: IChannel | null;
  modalID: string;
  sendMessage: (msg: string) => void;
  messages?: IMessage[];
  userId: User["_id"];
  deleteChannel?: (channelId: IChannel["_id"]) => void;
}) {
  const [sendMsg, setSendMsg] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [showMembers, setShowMembers] = useState(false);
  const isUserOwner = activeChat?.owner?._id === userId;
  const channelName =
    activeChat?.type === "dm"
      ? "@" +
        (isUserOwner ? activeChat?.members[0]?.tag : activeChat?.owner?.tag)
      : "#" + activeChat?.name || "";

  // TODO: make types conform

  return (
    <dialog id={modalID} className="modal">
      <div className="modal-box max-w-4xl overflow-hidden">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">{channelName}</div>

          <div className="dropdown mr-5">
            <div tabIndex={0} role="button" className="btn m-1" hidden={activeChat?.type === "dm"}>
              Options
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu p-2 space-y-2 shadow bg-base-100 rounded-box w-32"
            >
              <li
                role="button"
                className="btn btn-sm"
                hidden={activeChat?.type === "dm"}
                onClick={() => setShowMembers(!showMembers)}
              >
                {showMembers ? "Hide Members" : "Show Members"}
              </li>
              {isUserOwner && activeChat?.type === "channel" && (
                <li
                  role="button"
                  className="btn btn-sm btn-error"
                  onClick={() => {
                    if (activeChat) {
                      deleteChannel?.(activeChat._id);
                    }
                  }}
                >
                  Delete Channel
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="divider mt-0 mb-2"></div>

        {showMembers &&
          activeChat?.members.map((member) => (
            <div key={member._id} className="badge badge-ghost mr-2">
              <Avatar size={20} name={member.name} variant="beam" />
              {member.tag}
            </div>
          ))}

        <div className="overflow-y-auto max-h-130 mt-4 mb-4 bg-base-200 p-2 rounded-lg [overflow-anchor:none]">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div
                className={`chat ${
                  message.author._id === userId ? "chat-end" : "chat-start"
                }`}
                key={message._id}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Avatar
                      size={40}
                      name={message.author.name}
                      variant="beam"
                    />
                  </div>
                </div>
                <div
                  className={`chat-header gap-2 flex ${
                    message.author._id === userId ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="text-xs">{message.author.tag}</span>
                  <time className="text-xs opacity-50 mb-1">
                    {new Date(message.createdAt).toDateString() +
                      " " +
                      new Date(message.createdAt).toLocaleTimeString()}
                  </time>
                </div>
                <div className="chat-bubble">{message.msg}</div>
              </div>
            ))
          ) : (
            <div>No messages</div>
          )}
          <div ref={messageEndRef}></div>
        </div>

        <div className="modal-footer flex w-full items-stretch gap-1">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const msg = sendMsg.trim();
                if (!msg) return;
                sendMessage?.(msg);
                setSendMsg("");
              }
            }}
            onChange={(e) => setSendMsg(e.target.value)}
            value={sendMsg}
            className="input h-12 grow"
            placeholder="Type your message here..."
          ></input>
          <button
            disabled={sendMsg.trim().length === 0}
            type="button"
            className="btn btn-primary btn-square h-12"
            onClick={() => {
              sendMessage?.(sendMsg);
              setSendMsg("");
            }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="chat-modal-close">close</button>
      </form>
    </dialog>
  );
}
