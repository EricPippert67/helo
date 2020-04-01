import React, {Component} from 'react';
import{connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            searchInput: '',
            userPosts: true
        }
    }
    componentDidMount =() =>{
        this.getPosts();
    }
    handleToggle = () => {
        this.setState({
            postToggle: !this.state.postToggle
        })
    }
    handleSearch = () => {
        const {user_id} = this.props.user;
        let ifTrue = false;
        if (this.state.userPosts === true){
           ifTrue = true;
        }
        axios.get(`/api/posts/${user_id}/?userPosts=${ifTrue}`)
        .then(res => {
           this.setState({
              posts: res.data,
              searchInput: ''
              
           })
        })
     }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const mappedPosts = this.state.posts.map((e, i) => {
            return (
               <div key={i}>
                  <Link to={`/post/${e.post_id}`}><h1>{e.title}</h1></Link>
                  <h1>{e.author}</h1>
                  <img src={e.img} alt={e.title} />
               </div>
            )
         })
        return(

            <div>
                <input 
                placeholder='Search'
                name='search'
                type= 'search'
                onChange ={(e) => this.handleInput(e)}/>
                <button onClick={this.handleSearch}>Search</button>
                
                
                <button onClick={this.handleReset}>Reset</button>
          
                <input 
                placeholder='My Posts'
                name='my post'
                type= 'checkbox'
                onClick= {this.handleToggle}
                />
                <span>My Posts</span>
                <h1>My Posts, {this.props.user.username}</h1>
                {mappedPosts}
                


            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard)