import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import RaisedButton from 'material-ui/RaisedButton';
const request = require("request");

import { connect } from 'react-redux';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '20px 62px 36px 0',
    padding: '12px 50px 16px 50px'
  }
};

class AggregationPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onPress = this.onPress.bind(this);
  }

  onPress(){

  request.post("http://localhost:8083/insertData", { json: {}}, (error, resp, body) => {
          
          if (error || resp.statusCode !== 200) {
            console.log(error);
            this.setState({response: 'Request has failed!'});     
          }
          else{
            this.setState({response: body});
          }
          
     }); 
}

    render() {

    let {response} = this.state;  
     return (
        <div>
          <Paper style={style.paper}>
          <RaisedButton secondary={true} label="Aggregate Collaboration songs per albums" onClick={this.onPress}/>
          <br />
           <p>{response}</p>
           <br />
            <Link to="/menu">Go Back</Link>
          </Paper>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    response: state.response
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(AggregationPage);