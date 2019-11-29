import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavBarWrapper } from './nav-bar.style'

const NavBar = () => {
  return (
    <NavBarWrapper>
      <header>
        <section className='navBarAccount'>
          <NavLink className='navBarLink' to='/login'>
						Login
					</NavLink>
          <NavLink className='navBarLink' to='/register'>
						Register
					</NavLink>
        </section>
      </header>
    </NavBarWrapper>
  )
}

export default NavBar
