import { useEffect, useRef, useState } from "react";
import socket from "../socket";
import api from "../api/api";
import { FaPaperPlane } from "react-icons/fa";
import { format } from "timeago.js";

const ChatRoom = ({ deliveryId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

useEffect(() => {
  if (!deliveryId) return;

  // ✅ Join the specific room for this delivery
  socket.emit("joinRoom", { deliveryId });

  // ✅ Load old messages for this delivery
  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chat/${deliveryId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  fetchMessages();

  // ✅ Add specific handler that only processes messages of this deliveryId
  const handleNewMessage = (msg) => {
    if (msg.deliveryId === deliveryId) {
      setMessages((prev) => [...prev, msg]);
    }
  };

  socket.on("newMessage", handleNewMessage);

  // ✅ Cleanup on unmount
  return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [deliveryId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const messageData = {
      deliveryId,
      message: newMsg,
      sender: {
        _id: currentUser._id,
        name: currentUser.name,
        avatar: currentUser.avatar || "",
      },
    };

    socket.emit("sendMessage", messageData);
    setNewMsg("");
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-md mt-6 w-full px-4 sm:px-6">
      <h2 className="text-lg font-semibold mb-3 text-center">Live Chat</h2>

      <div className="h-64 overflow-y-auto px-2 py-1 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender._id === currentUser._id ? "justify-end" : "justify-start"
            }`}
          >
          <div
  className={`rounded-xl p-3 max-w-[70%] shadow-sm ${
    msg.sender._id === currentUser._id
      ? "bg-pink-200 text-gray-900 text-right"
      : "bg-sky-200 text-gray-800 text-left"
  }`}
>
         
              <div className="text-xs text-gray-600 font-semibold mb-1">
                {msg.sender.name}
              </div>
              <div className="text-sm">{msg.message}</div>
              <div className="text-[10px] text-gray-400 mt-1">
                {format(msg.timestamp || msg.createdAt)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-4 gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
