import './Branding.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import headshotImg from '../../statics/img/me/cartoon_headshot.png'


const Branding = ({ title, subtitle }) => {
  return (
    <Link to='/about' className='branding-container' >
      <div className='branding-text' >
        <span className='branding-title' >{title}</span>&nbsp;
        <span className='branding-subtitle' >{subtitle}</span>
      </div>
      <img className='branding-logo' src={headshotImg} />
    </Link>
  )
}

export default Branding
