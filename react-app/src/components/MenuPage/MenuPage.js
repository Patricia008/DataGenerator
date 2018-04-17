import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
    padding: '0 0 20px 0'
  },
  logout: {
    padding: '0 0 0 15px'
  }
};

class MenuPage extends Component {

    render() {
        
     // if (this.isLoginSuccess !== true) {
     //    return <p>Unathorized</p>
     //  } else {
     //    return <p>Authorized</p>
     //  }
     return (
        <div>
          <Paper style={style.paper}>
            <Menu>
              <Link to="/aggregationPage"><MenuItem primaryText="Aggregate Collaboration Songs on iTunes Albums" leftIcon={<RemoveRedEye />} /></Link>
              <Link to="/executionTimePage"><MenuItem primaryText="Get Execution Time" leftIcon={<RemoveRedEye />} /></Link>
            </Menu>
            <br /><br />
            <Link to="/" style={style.logout}>LogOut</Link>
          </Paper>
        </div>
    )
  }
}
 export default MenuPage