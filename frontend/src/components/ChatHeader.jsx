import React from 'react'
import useChatStore from '../store/useChatStore'

const ChatHeader = () => {
  const {selectedUser} = useChatStore();

  return (
    <div>
       <h1 className='p-2 ml-8'>{selectedUser.username}</h1>
    </div>
  )
}

export default ChatHeader