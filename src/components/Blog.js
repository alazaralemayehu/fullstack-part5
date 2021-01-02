import React, { useState  }from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = (props) => {
  const [blog, setBlog] = useState(props.blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLike = async(id) => {
    const likes = Number(blog.likes) + 1
    const newBlog = { ...blog, likes }
    delete newBlog.user
    const updatedBlog = await blogService.updateBlog(newBlog)
    setBlog(updatedBlog)
    let sortedBlogs = props.blogs.filter(blog =>  blog.id !== id)
    sortedBlogs.push(updatedBlog)
    sortedBlogs.sort(function(a,b) {
      return (a.likes - b.likes)
    })
    props.setBlogs(sortedBlogs)
  }

  const deleteBlog = async (blog) => {
    const result = window.confirm(`Remove blog ${ blog.title } by ${ blog.author }`)
    if (!result) return
    blogService.deleteBlog(blog.id)

    const updatedBlogs = props.blogs.filter(b => b.id !== blog.id)
    props.setBlogs(updatedBlogs)
  }

  return (
    <div style={ blogStyle }>
      <div>{ blog.title }</div>
      <div>
        <p> {blog.url }</p>
        <p>likes {blog.likes  }<button onClick={ () => increaseLike(blog.id) }>Like</button></p>
        <p>{ blog.author }</p>
        <button onClick={ () => deleteBlog(blog) }> remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  blog: PropTypes.object.isRequired
}
export default Blog
