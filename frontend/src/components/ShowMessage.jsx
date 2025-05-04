import React from 'react'

const ShowMessage = ({selectedUser}) => {
  return (
    <div>
        <h1>{selectedUser.username}</h1>
    </div>
  )
}

export default ShowMessage