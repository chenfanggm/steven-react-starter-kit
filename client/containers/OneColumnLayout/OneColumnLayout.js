import '../../styles/main.scss'
import React from 'react'
import { reportPageView } from '../../utils/analytics'
import classes from './OneColumnLayout.scss'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


class OneColumnLayout extends React.Component {

  componentWillMount() {
    reportPageView()
  }

  componentWillUpdate() {
    reportPageView()
  }

  componentDidMount() {
    // stop bg scrolling on mobile when modal is opened
    document.getElementsByTagName('body')[0].addEventListener('touchmove', (e) => {
      if (document.getElementsByClassName('.noScroll')[0].has(document.getElementsByClassName(e.target)).length) e.preventDefault()
    })
  }

  render() {
    const { children } = this.props

    return (
      <div className={classes.container}>
        <Navbar />
        <div className={classes.page}>
          <main className={classes.main}>
            {children}
          </main>
        </div>
        <div className={classes.bottom}>
          <Footer />
        </div>
        <div className={classes.hiddenLayer}>
        </div>
      </div>
    )
  }
}

export default OneColumnLayout

