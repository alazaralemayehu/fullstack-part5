import React from 'react'

const Notification = ({  message, notificationType  }) => {
  console.log('here ')

  if (message === null) {
    return null
  }
  return (
    <div className={ notificationType }>
      {message }
    </div>
  )
}

export default Notification