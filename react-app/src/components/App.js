import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm'
import MenuPage from './MenuPage/MenuPage'

class App extends Component {
  render() {
    return (
    <BrowserRouter>
          <Switch>
            <Route exact path='/' component={LoginForm} />
            <Route path="/menu" component={MenuPage} />
          </Switch>
    </BrowserRouter>
    )
  }
}

export default App