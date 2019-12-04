import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import axios from 'axios'
import { useAuth } from '../../context/auth'

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthTokens } = useAuth()
  
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleUsernameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    axios
			.post('/api/login', {
  username: username,
  password: password
})
			.then(
				res => {
  setAuthTokens(res.data)
  console.log(res)
  history.push('/profile')
},
				err => {
  console.log(err)
}
			)
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formBasicText'>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type='text'
            value={username}
            placeholder='Enter your username'
            onChange={handleUsernameChange}
					/>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Enter your password'
            onChange={handlePasswordChange}
					/>
        </Form.Group>
        <Button variant='primary' disabled={!validateForm()} type='submit'>
					Submit
				</Button>
      </Form>
    </Container>
  )
}

export default LoginPage
