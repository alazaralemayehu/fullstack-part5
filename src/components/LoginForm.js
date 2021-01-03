import React, { useState   }from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setErrorMessage, setNotificationType }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    }catch (exception) {
      setErrorMessage('wrong credentials')
      setNotificationType('error')

      setTimeout(() => {
        setErrorMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }
  return (
    <div id="login-form">
      <h3>
        Login
      </h3>
      <form onSubmit={ handleLogin }>
        <div>
          username
          <input
            id='username'
            type="text"
            value={ username }
            name="Username"
            onChange={ ({  target  }) => setUsername(target.value) }
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={ password }
            name="Password"
            onChange={ ({  target  }) => setPassword(target.value) }
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.PropsType = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired
}

export default LoginForm