import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm'
import MenuPage from './MenuPage/MenuPage'
import AggregationPage from './AggregationPage/AggregationPage'
import ExecutionTimePage from './ExecutionTimePage/ExecutionTimePage'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

class App extends Component {


  render() {

    return (
        <MuiThemeProvider >
            <BrowserRouter>
                  <Switch>
                    <Route exact path='/' component={LoginForm} />
                    <Route path="/menu" component={MenuPage} />
                    <Route path="/aggregationPage" component={AggregationPage}/>
                    <Route path="/executionTimePage" component={ExecutionTimePage} />
                  </Switch>
            </BrowserRouter>
    </MuiThemeProvider>
    )
  }
}

export default App