import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userInfo} from '../../ducks/reducer'
import axios from 'axios';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            registerView: false
        }
    }
    handleToggle = () => {
        this.setState({
            registerView: !this.state.registerView
        })
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = () => {
        const {username, password}= this.state
        axios.post('/auth/login', {username, password})
        .then(res => {
            this.props.userInfo(res.data)
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }
    handleRegister = () => {
        const{username, password} = this.state;
        if(password !== ''){
            axios.post('/auth/register', {username, password})
            .then(res => {
                this.props.userInfo(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
       
       }
    }
    render() {
        return(

            <div>
        
                <input
                    placeholder = 'Username'
                    name= 'username'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.handleLogin}>Login</button>    
                
                <button onClick={this.handleRegister}>Register</button>
                    
            </div>
        )
    }
}
export default connect(null, {userInfo})(Auth);