import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('credentials ', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      console.log('hello')
      setErrorMessage('wrong credentials')
      setNotificationType('error')

      setTimeout(() => {
        setErrorMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const addBlog = async(event) => {
    event.preventDefault()
    try {
      const blog =  {
        title: title,
        url: url,
        author: author
      }
      const newBlog = await blogService.create(blog)
      setAuthor("")
      setTitle("")
      setUrl("")
      setBlogs(blogs.concat(newBlog))
      const message= `a new blog ${newBlog.title} by ${newBlog.author}`
      setErrorMessage(message)
      setNotificationType('success')

      setTimeout(() => {
        setErrorMessage(null)
        setNotificationType(null)
      }, 5000)
    
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Something is wrong')
      setNotificationType('error')

      setTimeout(() => {
        setErrorMessage(null)
        setNotificationType(null)

      }, 5000)
    }

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  const blogList = () => (
    <div>

    <h2>blogs</h2>
    {user.username} logged in 
      <button onClick={logout}> logout</button>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    
    <form onSubmit={addBlog}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>

        <div>
        url
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />  
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} notificationType ={notificationType}/>

        {
        user===null ?
        loginForm():
        blogList()
        
      }
    
  
    </div>
  )
}

export default App