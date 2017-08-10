import React from 'react'
import { BrowserRouter } from 'react-router-dom'


class AppContainer extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes } = this.props

    return (<BrowserRouter children={routes} />)
  }
}

export default AppContainer
