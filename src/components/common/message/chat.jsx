import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import api from '../../../utils/axios'
import { useParams } from 'react-router-dom'
import Loader from '../../loader'
import { FiSend } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useSocket } from '../../../../soket'

const fetchChats = async (id) => {
  const { data } = await api.get(`/v1/chats/${id}`)
  return data
}

const Message = () => {
  const { id } = useParams()
  const user = useSelector(state => state.auth.user)
  const socket = useSocket()
  const messagesEndRef = useRef(null)

  const { data, isLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => fetchChats(id),
  })

  const [chat, setChat] = useState([])
  const [text, setText] = useState('')
  const [senderId, setSenderId] = useState(null)

  const teacher = user.chats.find(item => item.chatId === id)

  // Initialize chat messages from API
  useEffect(() => {
    if (data?.data?.messages) {
      setChat(data.data.messages)
    }
  }, [data])

  // Scroll to the latest message whenever chat changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  // Listen for incoming messages via socket
  useEffect(() => {
    if (!socket) return

    const handleReceive = (props) => {
      // Append new message
      console.log("hi")
      console.log(props.newchat)
      setChat(prev => [...prev, props.newChat])
      setSenderId(props.senderSocketId)
    }

    socket.on("receiveMessage", handleReceive)

    return () => {
      socket.off("receiveMessage", handleReceive)
    }
  }, [socket])

  const handleSend = () => {
    if (!text.trim()) return

    socket.emit("sendMessage", {
      senderUserId: user._id,
      senderSocketId: socket.id,
      receiverUserId: teacher.id,
      receiverSocketId: senderId,
      chatId: id,
      message: text,
      type: "text",
      userRole: user.role === "student" ? "teacher" : "student",
    })

    // Optimistically add your message to chat
    setChat(prev => [...prev, {
      sender: user._id,
      text,
      type: "text",
      createdAt: new Date().toISOString(),
    }])

    setText('')
  }

  if (isLoading) return <Loader />

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-zinc-50">
        <div className="flex items-center gap-2">
          <img src={teacher?.profilePic} className='h-8 w-8 rounded-full' alt="teacher"/>
          <h2 className="font-semibold">{teacher?.name}</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 bg-gradient-to-r from-white to-blue-100">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === user._id ? "justify-end" : "justify-start"} mb-2`}
          >
            <div className="max-w-[75%] relative px-4 py-2 bg-white rounded-lg text-sm shadow">
              {msg.text}
              <p className='absolute right-2 -bottom-4 text-xs'>
                {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center border-t border-zinc-800 p-3 bg-black">
        <input
          value={text}
          type="text"
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 outline-none bg-zinc-800 text-white placeholder-zinc-500 rounded-lg"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FiSend />
        </button>
      </div>
    </div>
  )
}

export default Message
