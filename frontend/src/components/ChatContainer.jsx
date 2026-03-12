import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utlis'
import { useRef } from 'react'

const ChatContainer = () => {

  const { messages, getMessages, isMessagesLoading, selectedUser, unSubscribeToMessages, subscribeToMessages } = useChatStore()
  const { authUser } = useAuthStore()
  //this ref is for auto scrolling to new message, when receive
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()

    return () => unSubscribeToMessages();

  }, [selectedUser._id])

  
  useEffect(()=>{
    if(messages && messageEndRef.current){
      messageEndRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  if (isMessagesLoading) return (
    <div className='flex flex-col flex-1'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )

  return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img
                  src={`${message.senderId === authUser._id ? authUser.profilePic || './avatar.png' : selectedUser.profilePic || './avatar.png'}`}
                  alt="ProfilePic"
                />
              </div>
            </div>
            <div className='chat-footer mt-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className={`chat-bubble ${message.senderId === authUser._id ? 'bg-primary text-primary-content' : ''}`}>
              {message.image && (
                <img
                  src={message.image}
                  className='sm:max-w-[200px] mb-2 rounded-md'
                  alt="image"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>

        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer