import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({ text: null, classname: '' })

  const blogFormRef = React.createRef()

  const sortByLikes = blogs => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortByLikes(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayErrorMessage = (text, errorType) => {
    setErrorMessage({ text, classname: errorType })
    setTimeout(() => {
      setErrorMessage({ text: null, classname: '' })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      displayErrorMessage(`${user.name} logged in`, 'success')
    } catch (error) {
      displayErrorMessage(error.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    displayErrorMessage(`${user.name} logged out`, 'success')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const createBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        blogFormRef.current.toggleVisibility()
        const sortedBlogs = sortByLikes(blogs.concat(returnedBlog))
        setBlogs(sortedBlogs)
        displayErrorMessage(`A new blog "${newBlog.title}" by ${newBlog.author} added`, 'success')
      }).catch(error => {
        displayErrorMessage(error.response.data.error, "error")
      })
  }

  const updateBlogs = (id, newObject) => {
    const blogIndex = blogs.findIndex(blog => blog.id === id)
    const newBlogList = [...blogs]
    newBlogList[blogIndex] = { ...newBlogList[blogIndex], likes: newObject.likes }
    setBlogs(sortByLikes(newBlogList))
  }

  const updateBlog = (id, updatedBlog) => {
    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        updateBlogs(id, returnedBlog)
      }).catch(error => {
        displayErrorMessage(error.response.data.error, "error")
      })
  }


  const removeBlog = (delBlog) => {
    if (window.confirm(`Delete "${delBlog.title}" by ${delBlog.author}?`)) {
      blogService.remove(delBlog.id)
        .then(reps => {
          const newBlogs = blogs.filter(blog => blog.id !== delBlog.id)
          setBlogs(newBlogs)
          displayErrorMessage(`Blog "${delBlog.title}" by ${delBlog.author} deleted`, 'success')

        }).catch(error => {
          displayErrorMessage(error.response.data.error, "error")
        })

    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMessage message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ErrorMessage message={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}
export default App