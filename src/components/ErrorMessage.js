import React from 'react'

const ErrorMessage = ({ message }) => {
  if (message.text === null) {
    return null
  }

  return (
    <div className={message.classname}>
      {message.text}
    </div>
  )
}

export default ErrorMessage