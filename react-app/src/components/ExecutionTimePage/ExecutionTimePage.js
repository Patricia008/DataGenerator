import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
const request = require("request");

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '20px 62px 36px 0',
    padding: '12px 50px 16px 50px'
  }
};

class ExecutionTimePage extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      this.getExecutionTime = this.getExecutionTime.bind(this);
      this.getExecutionTime();
    }

    getExecutionTime() {
      request.get("http://localhost:8083/getExecutionTime", (error, resp, body) => {

          if (error || resp.statusCode !== 200) {
            console.log(error);
            this.setState({execTimeResp: 'Request has failed!'});    
          }
          else{
            this.setState({execTimeResp: body}); 
          }
          
      }); 
    }

    render() {

    let {execTimeResp} = this.state;

     return (
        <div>
          <Paper style={style.paper}>
           <p>{execTimeResp}</p>
           <br />
            <Link to="/menu">Go Back</Link>
          </Paper>
        </div>
    )
  }

}

export default ExecutionTimePage