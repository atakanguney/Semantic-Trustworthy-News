import React from 'react'

import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='/'>Semantic Trusthworthy News</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/login'>Login</Nav.Link>
          <Nav.Link href='/register'>Register</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button variant='outline-success'>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
