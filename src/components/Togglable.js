import React, { useState, useImperativeHandle   }from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''  }
  const showWhenVisible = { display: visible ? '' : 'none'  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const getPropsDataToShow = (props) => {
    if (props.blog) {
      return (
        <span>{ props.blog.title } { props.blog.author }</span>
      )
    }else {
      return null
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={ hideWhenVisible }>
        <div className="togglableHeader">
          {getPropsDataToShow(props) }
        </div>
        <button onClick={ toggleVisibility }> {props.buttonLabel  }</button>
      </div>
      { visible ? (
        <div style={ showWhenVisible } className="togglableDetail">
          {props.children }
          <button onClick={ toggleVisibility }>{ props.negativeButtonLable }</button>
        </div>
      ) : <div> </div> }
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  negativeButtonLable: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable