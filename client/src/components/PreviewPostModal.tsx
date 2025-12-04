import Post from "./Post";

export default function PreviewPostModal({ postContent, modalID }: { postContent: string, modalID: string }) {
  return (
    <dialog id={modalID} className="modal">
      <div className="modal-box max-w-2xl overflow-hidden">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <Post preview={true} post={{ _id: "preview", author: { _id: "preview", name: "preview", tag: "preview" }, content: postContent, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }} onDelete={() => { }} onEdit={() => { }} />
        </form>
      </div>
    </dialog>
  );
}
