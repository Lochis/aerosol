export default function ChatModal({
  modalID,
  sendMessage,
}  : {
  modalID: string;
  sendMessage: (msg: string) => void;
}) {

 return (
    <dialog id={modalID} className="modal modal-bottom">
      <div className="modal-box lg:min-h-150 min-h-screen">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            console.log("chat modal test button clicked, sendMessage:", !!sendMessage);
            sendMessage?.("hello Test");
          }}
        >
          Click me to test
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}