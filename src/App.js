import React from 'react';
import {withRouter} from 'react-router-dom';
import routes from './routes';
import Nav from './Components/Nav/Nav'
import {Provider} from 'react-redux';
import store from './ducks/store';

import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/'
      ? (<>
          {routes}
         </>)
      : (<>
          <Nav />
          {routes}
         </>)}
    </div>
  );
}

export default withRouter(App);