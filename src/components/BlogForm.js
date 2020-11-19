import React, { useState, } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title <input
            id='title'
            type='text'
            value={blogTitle}
            name='Title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author <input
            id='author'
            type='test'
            value={blogAuthor}
            name='Author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL <input
            id='url'
            type='text'
            value={blogURL}
            name='URL'
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
        <button
          type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm