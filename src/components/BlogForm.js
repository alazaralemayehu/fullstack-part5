import React, { useState   }from 'react'

const BlogForm = ({ addBlog, setErrorMessage, setNotificationType }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const createBlog = async(event) => {
    event.preventDefault()
    try {
      const blog =  {
        title: title,
        url: url,
        author: author
      }
      setAuthor('')
      setTitle('')
      setUrl('')

      const message= `a new blog ${ blog.title  }by ${ blog.author }`
      setErrorMessage(message)
      setNotificationType('success')
      addBlog(blog)
      setTimeout(() => {
        setErrorMessage(null)
        setNotificationType(null)
      }, 5000)
    }catch (exception) {
      console.log(exception)
      setErrorMessage('Something is wrong')
      setNotificationType('error')
      setTimeout(() => {
        setErrorMessage(null)
        setNotificationType(null)

      }, 5000)
    }
  }
  return (
    <div>
      <form onSubmit={ createBlog }>
        <div>
          title
          <input
            type="text"
            value={ title }
            name="title"
            onChange={ ({  target  }) => setTitle(target.value) }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={ author }
            name="author"
            onChange={ ({  target  }) => setAuthor(target.value) }
          />
        </div>

        <div>
          url
          <input
            type="text"
            value={ url }
            name="url"
            onChange={ ({  target  }) => setUrl(target.value) }
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default BlogForm