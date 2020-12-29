import React from 'react'

const Notification = ({ message, notificationType }) => {
  console.log('here ')

  if (message === null) {
    return null
  }
  console.log('here again')
  return (
    <div className={notificationType}>
      {message}
    </div>
  )
}

export default Notification