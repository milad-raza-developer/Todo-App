import React from "react";
import firebase from "firebase";
import swal from "sweetalert";
import History from "../History/History";
import avatar from "../Images/avatar.png";

export default class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePsw = (e) => {
    this.setState({ password: e.target.value });
  };

  submit = () => {
    var db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((success) => {
        console.log("Signup -> submit -> success", success);
        swal({
          title: "Account Has Been Created",
          text: "Lets Strats Your Journey with us",
          icon: "success",
          button: "Ok",
        });

        db.collection("users")
          .add({
            name: this.state.name,
            email: this.state.email,
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            History.goBack(1);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
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
      <div className="container">
        <div className="wrapper">
          <div className="dboxSignup">
            <div className="avatarbox">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="dbox-heading">
              <h1 className="heading">Give us Your Information</h1>
            </div>

            <div className="formbox">
              <p>User Name</p>
              <input
                value={this.state.name}
                onChange={this.handleName}
                placeholder="Enter Name..."
                className="inputFields"
              />

              <p>User Email</p>
              <input
                value={this.state.email}
                onChange={this.handleEmail}
                placeholder="Enter Email"
                className="inputFields"
              />

              <p>Password</p>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePsw}
                placeholder="Enter New password..."
                className="inputFields"
              />
              <button className="submitbtn" onClick={this.submit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
