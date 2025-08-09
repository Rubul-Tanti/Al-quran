import React, { useState } from "react";
import { FiSend, FiUser, FiMenu } from "react-icons/fi";

const Chat = ({ userName = "You" }) => {
  const contacts = [
    { id: 1, name: "Ustadh Ahmad", lastMessage: "See you in class tomorrow!", unread: 2 },
    { id: 2, name: "Student Ali", lastMessage: "JazakAllah khair!", unread: 0 },
    { id: 3, name: "Ustadh Fatima", lastMessage: "Practice Surah Al-Baqarah", unread: 1 },
  ];

  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([
    { sender: selectedContact.name, text: "Salam! How can I help you today?" },
    { sender: userName, text: "Wa alaikum salam! I have a question about my lesson." },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: userName, text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-full bg-zinc-900 text-white rounded-lg overflow-hidden shadow-lg">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/3 bg-zinc-950 border-r border-zinc-800`}
      >
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setSelectedContact(contact);
                setMessages([
                  { sender: contact.name, text: `Salam! This is ${contact.name}.` },
                ]);
                setSidebarOpen(false);
              }}
              className={`p-4 cursor-pointer border-b border-zinc-800 transition ${
                selectedContact.id === contact.id
                  ? "bg-zinc-800"
                  : "hover:bg-zinc-800"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{contact.name}</p>
                {contact.unread > 0 && (
                  <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                    {contact.unread}
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-400 truncate">{contact.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-black border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <FiMenu className="text-xl" />
            </button>
            <FiUser className="text-xl" />
            <h2 className="font-semibold">{selectedContact.name}</h2>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-900">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === userName ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                  msg.sender === userName
                    ? "bg-black text-white rounded-br-none"
                    : "bg-zinc-800 text-white rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center border-t border-zinc-800 p-3 bg-black">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-3 py-2 outline-none bg-zinc-800 text-white placeholder-zinc-500 rounded-lg"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
