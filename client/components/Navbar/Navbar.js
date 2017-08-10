import './Navbar.scss'
import React from 'react'
import Branding from '../Branding'
import MainMenu from '../../containers/MainMenu'


const Navbar = () => (
  <header className='navbar-container' >
    <Branding title='Chen' />
    <MainMenu />
  </header>
)

export default Navbar
