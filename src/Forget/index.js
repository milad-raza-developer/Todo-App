import React from "react";
import firebase from "firebase";
import swal from "sweetalert";
import History from '../History/History'

export default class Forget extends React.Component {
  state = {
    email: "",
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  submit = () => {
    firebase
    .auth()
    .sendPasswordResetEmail(this.state.email)
    .then(function (success) {
      console.log("Signup -> submit -> success", success);
      swal({
        title: "Password Reset Successfully",
        text: "Check Your Email Now",
        icon: "success",
        button: "Ok",
      });
      History.goBack(1)
    })
    .catch(function (error) {
      swal({
        title: "Sorry !",
        text: "You clicked the button!",
        icon: "error",
        button: "Ok",
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <div className="dboxForget">
          <div className="dbox-heading">
            <h1 className="heading">Reset Password</h1>
            </div>

            <div className="formbox">
            <p>User Email</p>
              <input
                value={this.state.email}
                onChange={this.handleEmail}
                placeholder="Enter Email..."
                className="inputFields"
              />
            <button className="submitbtn" onClick={this.submit} id="forgetbtn">
              Reset Password
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
