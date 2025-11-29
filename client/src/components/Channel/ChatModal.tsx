import type { Message } from "../../types/message.types.ts";

export default function ChatModal({
  modalID,
  sendMessage,
  messagesByChannel,
}: {
  modalID: string;
  sendMessage: (msg: string) => void;
  messagesByChannel: Message[];
}) {
  return (
    <dialog id={modalID} className="modal modal-bottom">
      <div className="modal-box lg:min-h-150 min-h-screen">
        {messagesByChannel ? (
          messagesByChannel.map((message, index) => (
            <>
              <div className="text9xl font-bold">HELLO</div>
              <div key={index} className="chat-message">
                <div className="chat-bubble">{message.msg}</div>
              </div>
            </>
          ))
        ) : (
          <div>No messages</div>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
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
