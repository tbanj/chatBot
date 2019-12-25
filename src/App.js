import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";
import { Switch, Route } from 'react-router-dom';
import Join from './components/join/Join';
import Chat from './components/chat/Chat';
import './App.css';


class App extends Component {
  state = {}
  render() {
    return (
      <div className="">
        <ToastContainer />
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route exact path="/" component={Join} />
        </Switch>
      </div>
    );
  }
}

export default App;
