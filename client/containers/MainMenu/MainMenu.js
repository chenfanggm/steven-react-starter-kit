import './MainMenu.scss'
import React from 'react'


class MainMenu extends React.Component {

  constructor(props) {
    super(props)
    this.logoutHandler = this.logoutHandler.bind(this)
  }

  logoutHandler() {
  }

  render() {
    return (
      <nav className='menu-container'>
        <div className='dropdown-container'>
        </div>
      </nav>
    )
  }
}

export default MainMenu
