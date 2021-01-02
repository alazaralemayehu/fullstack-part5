import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const BlogList = ({blogs, setBlogs}) => {
  return (
    <div>
      { blogs.map(blog =>
        <Togglable key={blog.id} blog={blog} buttonLabel="show" negativeButtonLable="hide">
          <Blog 
            key={blog.id} 
            blog={blog} 
            blogs={blogs} 
            setBlogs={setBlogs} />
        </Togglable>
      )}

    </div>
  )
}


const NavBar = (props) => {
  const {username, logout} = props
  return (
    <p> {username} logged in <button onClick={logout}> logout</button> </p>
    )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  console.log("hell world")
  const blogFormRef = useRef()
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

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  if (user === null) {
   return( 
    <div>
      <Notification message={errorMessage} notificationType ={notificationType}/>
      <LoginForm setUser={setUser} setNotificationType={setNotificationType} setErrorMessage={setErrorMessage}/>
    </div>
   )
  } 
  const addBlog = async (blogObject) => {
    blogs.sort(function(a,b) {
      return (a.likes - b.likes)
    })
    
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
  }

  blogs.sort(function(a,b) {
    return (a.likes - b.likes)
  })
  return (
    <div>
    <h2>blogs</h2>

      <Notification 
        message={errorMessage} 
        notificationType ={notificationType}/>

      <NavBar 
        username={user.username} 
          logout={logout} /> 

    <Togglable buttonLabel = "new Blog" negativeButtonLable="Cancel" ref={blogFormRef}>
        <BlogForm 
        addBlog = {addBlog}
        setErrorMessage = {setErrorMessage}
        setNotificationType = {setNotificationType}
        />
      </Togglable>
      <br />
      <BlogList 
        blogs={blogs} 
        setBlogs = {setBlogs}
        logout={logout} />
        
     
    </div>
  )
}



export default App