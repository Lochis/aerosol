import { useState } from "react";
import Search from "../Search.tsx";
import type { ReducedUsers } from "../../types/user.types.ts";

export default function ChannelCreateModal({
  modalID,
  onCreate,
  members,
  setMembers,
}: {
  modalID: string;
  onCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  members: ReducedUsers[];
  setMembers: React.Dispatch<React.SetStateAction<ReducedUsers[]>>;
}) {
  // TODO: allow for channels to be created with multiple users.

  const [isDM, setIsDM] = useState(false);

  const addMember = (user: ReducedUsers) => {
    if (!members.some((member) => member._id === user._id)) {
      // only one member for DM
      if (isDM) {
        setMembers([user]);
        return;
      }
      // allow multiple members for group channels
      setMembers([...members, user]);
    }
  };

  const removeMember = (user: ReducedUsers) => {
    setMembers(members.filter((id) => id !== user));
  };

  return (
    <dialog id={modalID} className="modal modal-top sm:modal-middle">
      <div className="modal-box min-h-120">
        <h2 className="font-bold">Create Channel</h2>
        <form
          className="mt-4 flex flex-col gap-2"
          method="dialog"
          onSubmit={onCreate}
        >
          <input
            className="input w-full"
            name="name"
            type="text"
            placeholder="Channel Name"
            disabled={isDM}
          />

          <select
            className="select w-full"
            name="type"
            onChange={(e) => setIsDM(e.target.value === "dm")}
          >
            <option value="channel">Channel</option>
            <option value="dm">Direct Message</option>
          </select>

          <Search
            onSelect={(user) => addMember(user)}
          />
          <div className="flex flex-wrap gap-2">
            {members.length > 0 && <label className="font-bold w-full">Members:</label>}
            {members.map((member) => (
              <div key={member._id} className="badge badge-lg badge-ghost pr-0 mr-0">
                {member.tag}
                <button className="btn btn-ghost btn-xs btn-circle" onClick={() => removeMember(member)}>
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button className="btn btn-primary w-full">Create</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button id="channel-create-modal-close">close</button>
      </form>
    </dialog>
  );
}
