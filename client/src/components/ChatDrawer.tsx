import type { Channel } from "../types/channel.types.ts";
import Channel from "./Channel/Channel.tsx";
import ChannelCreateModal from "./Channel/ChannelCreateModal.tsx";
import { useAuth } from "../lib/auth.ts";
import { useState, useEffect } from "react";
import { useToast } from "./Toast";

export default function ChatDrawer(htmlFor: string) {
  const auth = useAuth();
  const toast = useToast();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    getChannels();
  }, [drawerOpen]);
  
  const getChannels = async () => {
    try {
      const response = await auth.client.get("/channel");
      setChannels(response.data);
    } catch (error) {
      toast.error(error);
    }
  }

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
      // create, get the channel back from server to set Channels state
      await auth.client.post("/channel", channel, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      toast.error(error);
    }
    await getChannels();
  };

  const onOpen = () => {
    console.log("Open channel");
    const channel: Channel = {
      id: "1",
      name: "General",
      type: "channel",
    };
    console.log(channel);
  };

  return (
    <div className="drawer">
      <ChannelCreateModal
        modalID="channel-create-modal"
        onCreate={createChannel}
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
          {/* Hamburger icon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="divider"></div>
          {channels.map((channel) => (
            <li key={channel.id}>
              <Channel channel={channel} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
