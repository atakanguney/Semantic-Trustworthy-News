import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import axios from 'axios'

const LoginPage = history => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    axios
			.post('/login', {
  username: username,
  password: password
})
			.then(
				res => {
  console.log(res)
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
            placeholder='Enter username'
            onChange={handleUsernameChange}
					/>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Password'
            onChange={handlePasswordChange}
					/>
        </Form.Group>
        <Button variant='primary' type='submit'>
					Submit
				</Button>
      </Form>
    </Container>
  )
}

export default LoginPage
