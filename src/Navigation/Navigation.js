import React from "react";
import Home from "../Home/index";
import Login from "../Login/index";
import Signup from "../Signup/index";
import Forget from '../Forget/index'
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class Navigation extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forget">
          <Forget />
        </Route>
      </Router>
    );
  }
}
