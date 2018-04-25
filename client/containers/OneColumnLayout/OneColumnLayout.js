import './OneColumnLayout.scss'
import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


class OneColumnLayout extends React.Component {
  render() {
    const { children } = this.props;

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

