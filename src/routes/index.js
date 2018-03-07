import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import OneColumnLayout from '../containers/OneColumnLayout'
import AboutPage from './AboutPage'


export default (
  <OneColumnLayout>
    <Switch>
      <Route exact path='/' component={AboutPage} />
      <Redirect path='*' to='/' />
    </Switch>
  </OneColumnLayout>
)
