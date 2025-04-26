import React, { useEffect, useState } from 'react'
import api from '../api';
const Message = () => {

  const [allusers,setallusers] = useState();
  useEffect(()=> {
    const userHandler = async () => {
      const response = await api.get("/users/getallusers")
      setallusers(response.data.users) 
    }
    userHandler()    
  },[])
  console.log(allusers)
  return (
    <div>
      {allusers && allusers.map(user => (
        <h1>{user.username}</h1>
      ))}
    </div>
  )
}

export default Message