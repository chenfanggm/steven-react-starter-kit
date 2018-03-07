import './Footer.scss'
import React from 'react'


const Footer = () => (
  <footer className='footer-container' >
    <div className='footer-top' >
      All Rights Reserved ©2016 Chen Fang
    </div>
    <div className='footer-bottom'>
      <a href='/rss.xml' className='footer-link' >
        Follow Rss&nbsp;
        <i className='fa fa-rss' aria-hidden='true' ></i>
      </a>
    </div>
  </footer>
)

export default Footer
