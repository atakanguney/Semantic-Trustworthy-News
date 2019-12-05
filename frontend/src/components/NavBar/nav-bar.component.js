import React from 'react'
//import { NavLink } from 'react-router-dom'
//import { NavBarWrapper } from './nav-bar.style'

import {Navbar, Nav, FormControl, Form, Button} from 'react-bootstrap';
// import {Navbar, Nav, NavDropdown, FormControl, Form, Button} from 'react-bootstrap';
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'



const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Semantic Trusthworthy News</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          {/* <NavDropdown title="TBD" id="basic-nav-dropdown">
            <NavDropdown.Item href="/">TBD</NavDropdown.Item>
            <NavDropdown.Item href="/">TBD</NavDropdown.Item>
            <NavDropdown.Item href="/">TBD</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">TBD</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>    
    // <NavBarWrapper>
    //   <header>
    //     <section className='navBarAccount'>
    //       <NavLink className='navBarLink' to='/login'>
		// 				Login
		// 			</NavLink>
    //       <NavLink className='navBarLink' to='/register'>
		// 				Register
		// 			</NavLink>
    //     </section>
    //   </header>
    // </NavBarWrapper>
  )
}

export default NavBar

