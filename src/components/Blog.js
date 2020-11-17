import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const viewOrHide = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{viewOrHide}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>

  )
}



export default Blog
