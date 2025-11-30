import type { IChannel } from "../types/channel.types.ts";
import type { IMessage } from "../types/message.types.ts";
import Channel from "./Channel/Channel.tsx";
import ChannelCreateModal from "./Channel/ChannelCreateModal.tsx";
import ChatModal from "./Channel/ChatModal.tsx";
import HamburgerIcon from "./icons/HamburgerIcon.tsx";
import PlusIcon from "./icons/PlusIcon.tsx";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../lib/auth.ts";
import { useState, useEffect, useRef } from "react";
import { useToast } from "./Toast";
import type { ReducedUsers } from "../types/user.types.ts";

export default function ChatDrawer({ htmlFor }: { htmlFor: string }) {
  const auth = useAuth();
  const toast = useToast();
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<IChannel | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [messagesByChannel, setMessagesByChannel] = useState<
    Record<string, IMessage[]>
  >({});

  // for use in ChannelCreateModal
  const [members, setMembers] = useState<ReducedUsers[]>([]);

  const chatModal = document.getElementById(
    "chat-modal"
  ) as HTMLDialogElement | null;

  const getChannels = async () => {
    try {
      const response = await auth.client.get("/channel");
      setChannels(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getChannels();

    if (socketRef.current) return;

    console.log("client api base:", process.env.CLIENT_API_BASE);
    if (!process.env.CLIENT_API_BASE) {
      toast.error("CLIENT_API_BASE not set");
      return;
    }

    const socket = io(
      process.env.CLIENT_API_BASE.replace(/\/api\/?$/, "") ||
        "http://localhost:3000",
      {
        transports: ["websocket"],
      }
    );

    socket.on("connect", () => console.info("socket connected", socket.id));

    socket.on("message", (message: IMessage) => {
      console.log("Message back to client! ", message);
      const { channelId } = message;
      setMessagesByChannel((prev) => ({
        ...prev,
        [channelId]: [...(prev[channelId] || []), message],
      }));
    });

    socket.on("connect_error", (err) =>
      toast.error("socket connect_error: " + err)
    );

    socket.on(
      "history",
      (history: { channelId: string; messages: IMessage[] }) => {
        setMessagesByChannel((prev) => {
          const currentMessages = prev[history.channelId] || [];
          const mergedMessages = [...currentMessages, ...history.messages];
          // Remove duplicates based on message _id
          const uniqueMessages = mergedMessages.filter(
            (msg, index, self) =>
              index === self.findIndex((m) => m._id === msg._id)
          );
          return {
            ...prev,
            [history.channelId]: uniqueMessages,
          };
        });
        console.log("Socket history retrieved for channel:", history.channelId);
      }
    );

    socket.on("error", (err) => toast.error("socket error: " + err));

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const createChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const type = formData.get("type") as "dm" | "channel";
    const searchUser = formData.get("searchUser") as string;

    console.log("Create channel");
    const channel: IChannel = {
      name: type === "dm" ? searchUser : name,
      type: type,
      members: members.map((user) => user._id),
    };

    try {
      // create
      await auth.client.post("/channel", channel, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      toast.error(error);
    }
    await getChannels();
    document.getElementById("channel-create-modal-close")?.click();
  };

  const onOpenChannel = (channel: IChannel) => {
    chatModal?.showModal();
    setActiveChat(channel);

    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit("join", channel._id);
      socket.emit("getHistory", { channelId: channel._id });
    }
  };

  const deleteChannel = async (channelId: IChannel["_id"]) => {
    try {
      await auth.client.delete(`/channel/${channelId}`);
      document.getElementById("chat-modal-close")?.click();
      setActiveChat(null);
      await getChannels();
      
    } catch (error) {
      toast.error(error);
    }
  };

  const sendMessage = async (msg: string) => {
    console.log("From sendmessage", activeChat);
    if (!activeChat) return;
    const socket = socketRef.current;
    const payload = {
      channelId: activeChat._id,
      author: auth.me._id,
      msg: msg,
    };

    if (socket && socket.connected) {
      socket.emit("message", payload);
      return;
    }
  };

  const currentMessages =
    activeChat && activeChat._id ? messagesByChannel[activeChat._id] || [] : [];
  return (
    <div className="drawer">
      <ChannelCreateModal
        modalID="channel-create-modal"
        onCreate={createChannel}
        members={members}
        setMembers={setMembers}
      />
      <ChatModal
        activeChat={activeChat}
        userId={auth.me._id}
        modalID="chat-modal"
        sendMessage={sendMessage}
        messages={currentMessages}
        deleteChannel={deleteChannel}
      />
      <input
        id={htmlFor}
        onChange={() => setDrawerOpen(!drawerOpen)}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label
          htmlFor={htmlFor}
          className="btn btn-square btn-ghost drawer-button"
        >
          <HamburgerIcon />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={htmlFor}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-lg min-h-full w-80 p-4">
          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="text-2xl font-bold">Messages</h3>
            <button
              className="btn btn-primary btn-circle w-8 h-8"
              onClick={() => {
                const createDialog = document.getElementById(
                  "channel-create-modal"
                ) as HTMLDialogElement | null;
                createDialog?.showModal();
              }}
            >
              <PlusIcon />
            </button>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            {channels.map((channel) => (
              <li key={channel._id}>
                <Channel
                  channel={channel}
                  isUserOwner={channel.owner?._id === auth.me._id}
                  onOpenChannel={() => onOpenChannel(channel)}
                />
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
