import React from 'react'
import classes from './MainMenu.scss'


class MainMenu extends React.Component {

  constructor(props) {
    super(props)
    this.logoutHandler = this.logoutHandler.bind(this)
  }

  logoutHandler() {
    this.props.logoutUser()
  }

  render() {
    return (
      <nav className={classes.container}>
        <div id='dropdownContainer'
             className={classes.dropdownContainer}>
        </div>
      </nav>
    )
  }
}

export default MainMenu
