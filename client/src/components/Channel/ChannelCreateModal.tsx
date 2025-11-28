import { useState } from "react";
import Search from "../Search.tsx";

export default function ChannelCreateModal({
  modalID,
  onCreate,
}: {
  modalID: string;
  onCreate: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  // TODO: allow for channels to be created with multiple users.

  const [isDM, setIsDM] = useState(false);

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

          {isDM && <Search navigateOnSelect={false} />}
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
