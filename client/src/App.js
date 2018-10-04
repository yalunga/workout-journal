import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Data from './components/Data';
import Lifts from './components/Lifts';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(){
    super();
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path ="/profile" component={Profile} />
          <Route path="/profile/data" component={Data} />
          <Route path="/profile/lifts" component={Lifts} />
        </div>
      </Router>
    );
  }
}

export default App;
