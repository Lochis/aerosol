import type { Channel } from "../types/channel.types.ts";
import type { Message } from "../types/message.types.ts";
import Channel from "./Channel/Channel.tsx";
import ChannelCreateModal from "./Channel/ChannelCreateModal.tsx";
import ChatModal from "./Channel/ChatModal.tsx";
import HamburgerIcon from "./icons/HamburgerIcon.tsx";
import PlusIcon from "./icons/PlusIcon.tsx";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../lib/auth.ts";
import { useState, useEffect, useRef } from "react";
import { useToast } from "./Toast";

export default function ChatDrawer(htmlFor: string) {
  const auth = useAuth();
  const toast = useToast();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<Channel | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [messagesByChannel, setMessagesByChannel] = useState<Map<Channel._id, Message[]>>(new Map());

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

    const socket = io("http://localhost:3000", {
      auth: { token: auth.me._id },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => console.info("socket connected", socket.id));

    socket.on("message", (msg: any) => {
      console.log("The returned message", msg)
    });

    socket.on("connect_error", (err) =>
      console.warn("socket connect_error", err)
    );

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const createChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const searchUser = formData.get("searchUser") as string;

    console.log("Create channel");
    const channel: Channel = {
      name: type === "dm" ? searchUser : name,
      type: type,
      members: [searchUser],
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
  };

  const onOpenChannel = (channel: Channel) => {
    document.getElementById("chat-modal").showModal();
    setActiveChat(channel);

    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit("join", channel._id);
    }
  };

  const sendMessage = async (msg: string) => {
    console.log("From sendmessage", activeChat);
    if (!activeChat) return;
    const socket = socketRef.current;
    const payload = {
      channelId: activeChat._id,
      msg: msg,
    };

    if (socket && socket.connected) {
      socket.emit("message", payload);
      return;
    }
  };

  return (
    <div className="drawer">
      <ChannelCreateModal
        modalID="channel-create-modal"
        onCreate={createChannel}
      />
      <ChatModal modalID="chat-modal" sendMessage={sendMessage} />
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
              onClick={() =>
                document.getElementById("channel-create-modal").showModal()
              }
            >
              <PlusIcon />
            </button>
          </div>
          <div className="divider"></div>
          {channels.map((channel) => (
            <li key={channel._id}>
              <Channel
                channel={channel}
                isUserOwner={channel.owner === auth.me._id}
                onOpenChannel={() => onOpenChannel(channel)}
                messagesByChannel={messagesByChannel.get(channel._id) || []}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
