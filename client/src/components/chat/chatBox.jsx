import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import "./chat.scss";

function ChatBox({ receiverId }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const handleOpenChat = async (id, receiver) => {
      try {
        const res = await apiRequest("/chats/" + id);
        console.log(res.data);

        setChat({ ...res.data, receiver });
      } catch (err) {
        console.log(err);
      }
    };
    handleOpenChat(currentUser._id, receiverId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    console.log("Chat", chat);

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat._id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver._id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatContainer">
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {/* {chat?.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser._id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser._id ? "right" : "left",
                }}
                key={message._id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))} */}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
