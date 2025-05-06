import React from 'react'
import useChatStore from '../store/useChatStore'

const ChatHeader = () => {
  const {selectedUser} = useChatStore();
  console.log(selectedUser)
  return (
    <div className='flex  bg-neutral-200 p-2 pl-10'>
      <img className='w-10 h-10 rounded-full bg-amber-50' src={selectedUser.profilePhoto} alt="profile" />
       <h1 className='p-2 '>{selectedUser.username}</h1>
    </div>
  )
}

export default ChatHeader