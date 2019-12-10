import React, { useContext } from 'react'

import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../context/auth'

export default () => {
  const { removeAuthTokens } = useContext(AuthContext)

  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='/'>Semantic Trusthworthy News</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/profile'>Profile</Nav.Link>
          <Nav.Link onClick={removeAuthTokens}>Logout</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-success'>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}
