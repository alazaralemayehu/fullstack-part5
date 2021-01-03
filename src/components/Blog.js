import React, { useState  }from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = (props) => {

  const [visible, setVisible] = useState(false)
  let blog = props.blog
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const deleteBlog = async (blog) => {
    const result = window.confirm(`Remove blog ${ blog.title } by ${ blog.author }`)
    if (!result) return
    blogService.deleteBlog(blog.id)

    const updatedBlogs = props.blogs.filter(b => b.id !== blog.id)
    props.setBlogs(updatedBlogs)
  }

  return (
    <div style={ blogStyle } >
      <div className="blogHeader">{ blog.title } {blog.author}
        <button onClick={ toggleVisibility }> {visible ? 'hide' : 'show'}</button>
      </div>
      {
        visible?
          (
            <div className="blogDetail">
              <p> {blog.url }</p>
              <p>likes {blog.likes  }<button id="increaseLike" onClick={ () => props.increaseLike(blog) }>Like</button></p>
              <p>{ blog.author }</p>
              <button onClick={ () => deleteBlog(blog) }> remove</button>
            </div>
          ) : <div> </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}
export default Blog
