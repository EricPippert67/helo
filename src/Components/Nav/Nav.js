import React, {Component} from 'react';
import {connect} from 'react-redux';

class Nav extends Component{
    

    render() {
        return(

            <div>
                

            Nav
            <button onClick={this.handleHome}>Home</button>
            <button onClick={this.handleNewPost}>New Post</button>
            <button onClick={this.handleLogout}>Logout</button>


            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Nav);