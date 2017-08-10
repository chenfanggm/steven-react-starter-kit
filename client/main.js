import './normalize'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import AppContainer from './containers/AppContainer'


// --------------------------------------
// Render Setup
// --------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <AppContainer routes={routes} />,
    MOUNT_NODE
  )
}

// Development Tools
if (__DEV__) {
  if (module.hot) {
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    const renderApp = render
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./containers/AppContainer', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// --------------------------------------
// Go!
// --------------------------------------
render()
