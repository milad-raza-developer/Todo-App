import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import swal from "sweetalert";
import "./style.css";

import History from "../History/History";
import avatar from "../Images/avatar.png";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePsw = (e) => {
    this.setState({ password: e.target.value });
  };

  submit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function (success) {
        console.log("Signup -> submit -> success", success);
        History.push("./home");
        swal({
          title: "Successfully Login",
          text: "Welcome Back",
          icon: "success",
          button: "Ok",
        });
      })
      .catch(function (error) {
        swal({
          title: "Sorry !",
          text: "You clicked the button!",
          icon: "error",
          button: "Ok",
        });
      });
  };

  render() {
    return (
      <div className="logincontainer">
        <div className="wrapper">
          <div className="dboxlogin">
            <div className="avatarbox">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="dbox-heading">
              <h1 className="heading">Welcome Back {this.state.email}</h1>
            </div>
            <div className="formbox">
              <p>Email</p>
              <input
                value={this.state.email}
                onChange={this.handleEmail}
                placeholder="Enter Email..."
                className="inputFields"
              />
              <p>Password</p>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePsw}
                placeholder="Enter Password..."
                className="inputFields"
              />
              <button className="submitbtn" onClick={this.submit}>
                Login
              </button>
              <div className="dlinks">
                <Link to="/signup" className="links">
                  Dont Have an Account?{" "}
                </Link>
                <br />
                <Link to="/forget" className="links">
                  Forgot Your Password?{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
