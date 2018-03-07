import './OneColumnLayout.scss'
import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { reportPageView } from '../../utils/analytics'


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
      <div className='layout-container' >
        <Navbar />
        <div className='layout-page' >
          <main className='page-main' >
            {children}
          </main>
        </div>
        <div className='layout-bottom' >
          <Footer />
        </div>
        <div className='layout-hidden' >
        </div>
      </div>
    )
  }
}

export default OneColumnLayout

