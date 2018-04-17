import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer';
import './LoginForm.css';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

let events = require('events');
let eventEmitter = new events.EventEmitter();


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    eventEmitter.on('loginSuccess', () => {
        const path = '/menu/';
        this.props.history.push(path);
    });
  }

    render() {
    let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
        <div className="form-group-collection">

          <TextField
            hintText="Email"
            floatingLabelText="Email"
            floatingLabelFixed={false}
            onChange={e => this.setState({email: e.target.value})} value={email}
          />
          <br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            floatingLabelFixed={false}
            type="password"
            onChange={e => this.setState({password: e.target.value})} value={password}
          /><br />
        </div><br /><br />

        <center>
        <RaisedButton type="submit" label="Login" />
        <br /><br />
        <div className="message">
          { isLoginPending && <div>Please wait...</div> }
          { isLoginSuccess && <div>Success.</div> }
          { loginError && <div>{loginError.message}</div> }
        </div>
        </center>
        
      </form>
    )
  }

  onSubmit(e) {
    e.preventDefault();

    let { email, password } = this.state;
    this.props.login(email, password, eventEmitter);
    this.setState({
      email: '',
      password: ''
    });
  }
    
}



const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, eventEmitter) => dispatch(login(email, password, eventEmitter))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);