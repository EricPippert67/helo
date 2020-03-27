import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/store'
import axios from 'axios';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            VerPassword: '',
            username:'',
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
        const {email, password}= this.state;
        axios.post('/api/login', {email, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }
    handleRegister = () => {
        const{email, password, VerPassword, username} = this.state;
        if(password === VerPassword && password !== ''){
            axios.post('/api/register', {email, password, username})
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
       }else if(password !== VerPassword) {
           alert('Passwords are not matching Dude!')
       }else if(password === '') {
           alert('Password has to contain characters man!!!')
       }
    }
    render() {
        return(

            <div>
                {this.state.loginView
                ? (<> 
                <h1>Login Here</h1>
                <input
                    placeholder = 'Email'
                    name= 'email'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    placeholder='Password'
                    type='password'
                    name='password'
                    onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.handleLogin}>Login</button>    
                <p>Don't have an account? <span onClick={this.handleToggle}>Register here.</span></p>
                </>)
                : (<>
                <h1>Register Here</h1>
                <input
                    placeholder = 'Email'
                    name= 'email'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    placeholder='Password'
                    type='password'
                    name='password'
                    onChange={(e) => this.handleInput(e)}/>
                <input
                    placeholder='Verify Password'
                    type= 'password'
                    name='VerPassword'
                    onChange={(e)=> this.handleInput(e)}/>
                <input
                    placeholder='Username'
                    name='username'
                    onChange={(e) => this.handleInput(e)}/>
                <button onClick={this.handleRegister}>Register</button>
                    <p>Have an account? <span onClick={this.handleToggle}>Login here.</span></p>  

                </> )}
            </div>
        )
    }
}
export default connect(null, {getUser})(Auth);