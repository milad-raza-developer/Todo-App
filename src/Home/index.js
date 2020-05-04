import React from "react";
import History from "../History/History";
import db from "../fire";
import firebase from "firebase";
import "./style.css";
import Delete from "../Images/delete.png";
import back from "../Images/back.webp";
import swal from "sweetalert";
export default class Home extends React.Component {
  state = {
    task: "",
    desc: "",
    taskType: "",
    tasksArray: [],
    taskWorkArray: [],
    taskPersonalArray: [],
    taskShoppingArray: [],
    taskHealthArray: [],
    taskOtherArray: [],
  };
  componentDidMount = () => {
    this.getData();
    this.getWorkData();
    this.getPersonalData();
    this.getShoppingData();
    this.getHealthData();
    this.getOtherData();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // let jsonEmail = JSON.stringify(user.email)
        let jsonUser = JSON.stringify(user.uid);
        // localStorage.setItem("userEmail", jsonEmail);
        localStorage.setItem("uid", jsonUser);
      } else {
        // No user is signed in.
      }
    });
  };
  getData = () => {
    let uid = localStorage.getItem("uid");
    let array = [];
    db.collection("tasks")
      .where("uid", "==", uid)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          array.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ tasksArray: array });
        console.log(this.state.tasksArray);
      });
  };

  // getUserName = () => {
  //   let userEmail = localStorage.getItem("userEmail");
  //   console.log(userEmail)
  //   let array = [];
  //   db.collection("users")
  //     .where("email", "==", userEmail)
  //     .get()
  //     .then((data) => {
  //       console.log(data)
  //       data.forEach((doc) => {
  //         array.push({ id: doc.id, data: doc.data() });
  //       });
  //       this.setState({userName: array});
  //     });
  // };

  dleteTask = (id) => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
        this.getData();
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    console.log(id);
  };

  logout = () => {
    History.push("./");
  };

  handleTask = (e) => {
    this.setState({ task: e.target.value });
  };
  handleDesc = (e) => {
    this.setState({ desc: e.target.value });
  };
  handleTaskType = (e) => {
    this.setState({ taskType: e.target.value });
  };
  openAddModal = () => {
    document.getElementById("addModal").className = "addTaskModal";
    document.getElementById("mainModal").className = "dspOff";
  };
  closeAddModal = () => {
    document.getElementById("addModal").className = "dspOff";
    document.getElementById("mainModal").className = "HomeModal";
  };
  openTypeModal = () => {
    document.getElementById("typeModal").className = "typeModal";
    document.getElementById("mainModal").className = "dspOff";
  };
  closeTypeModal = () => {
    document.getElementById("typeModal").className = "dspOff";
    document.getElementById("mainModal").className = "HomeModal";
  };

  getWorkData = () => {
    let uid = localStorage.getItem("uid");
    let array = [];
    db.collection("tasks")
      .where("uid", "==", uid)
      .where("uid", "==", uid)
      .where("taskType", "==", "Work")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          array.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ taskWorkArray: array });
        console.log(this.state.taskWorkArray);
      });
  };
  getPersonalData = () => {
    let uid = localStorage.getItem("uid");
    let array = [];
    db.collection("tasks")
      .where("uid", "==", uid)
      .where("taskType", "==", "Personal")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          array.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ taskPersonalArray: array });
      });
  };
  getShoppingData = () => {
    let uid = localStorage.getItem("uid");
    let array = [];
    db.collection("tasks")
      .where("uid", "==", uid)
      .where("taskType", "==", "Shopping")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          array.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ taskShoppingArray: array });
      });
  };
  getHealthData = () => {
    let uid = localStorage.getItem("uid");
    let array = [];
    db.collection("tasks")
      .where("uid", "==", uid)
      .where("taskType", "==", "Health")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          array.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ taskHealthArray: array });
      });
  };
  getOtherData = () => {
    let uid = localStorage.getItem("uid");
    let array = [];
    db.collection("tasks")
      .where("uid", "==", uid)
      .where("taskType", "==", "Other")
      .get()
      .then((data) => {
        data.forEach((doc) => {
          array.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ taskOtherArray: array });
      });
  };

  addTask = () => {
    let uid = localStorage.getItem("uid");
    db.collection("tasks")
      .add({
        task: this.state.task,
        desc: this.state.desc,
        uid,
        taskType: this.state.taskType,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.getData();
        swal({
          title: "Task Added Successfully",
          // text: "Lets Strats Your Journey with us",
          icon: "success",
          button: "Ok",
        });
        this.closeAddModal();
        window.location.reload();
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    let monthsArray = [
      "January",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let date = today.getDate();
    let monthName = monthsArray[month];
    let fullDate = monthName + " " + date + ", " + year;

    return (
      <div className="homecontainer">
        <div className="homewrapper">
          {/* Home Modal */}
          <div className="HomeModal" id="mainModal">
            <div className="head">
              <h1>Hey Milad Raza</h1>
              <button className="add-btn" onClick={this.openAddModal}>
                +
              </button>
              {/* <button className="add-btn" onClick={this.logout}>Logout</button> */}
            </div>
            <span className="taskCounter">
              Today You have <span>{this.state.tasksArray.length}</span> tasks
            </span>
            <div className="dinfoBox">
              <div className="dspacer"></div>

              <div className="dboxtasks alltasks">
                <span className="counter">{this.state.tasksArray.length}</span>
                <span className="counterText">tasks created</span>
              </div>
              <div className="dboxtasks">
                <span className="counter">{this.state.tasksArray.length}</span>
                <span className="counterText">tasks left</span>
              </div>
            </div>
            <div className="dboxline"></div>

            <div className="dboxtasktypes">
              <div className="dboxtasktype" onClick={this.openTypeModal}>
                <span className="taskTypeName">Work</span>
                <span className="counterText">
                  <span>{this.state.taskWorkArray.length}</span> tasks
                </span>
              </div>
              <div className="dboxtasktype" onClick={this.openTypeModal}>
                <span className="taskTypeName">Personal</span>
                <span className="counterText">
                  <span>{this.state.taskPersonalArray.length}</span> tasks
                </span>
              </div>

              <div className="dboxtasktype" onClick={this.openTypeModal}>
                <span className="taskTypeName">Shopping</span>
                <span className="counterText">
                  <span>{this.state.taskShoppingArray.length}</span> tasks
                </span>
              </div>
              <div className="dboxtasktype" onClick={this.openTypeModal}>
                <span className="taskTypeName">Health</span>
                <span className="counterText">
                  <span>{this.state.taskHealthArray.length}</span> tasks
                </span>
              </div>
            </div>

            <div className="dboxdate">
              <h3>Today</h3>
              <span id="date" className="counterText">
                {fullDate}
              </span>
            </div>

            <div className="dboxviewdata">
              {this.state.tasksArray.map((item, index) => {
                return (
                  <div className="dviewtask">
                    <span>{item.data.task}</span>
                    <span>{item.data.desc}</span>
                    <img
                      src={Delete}
                      className="deletelogo"
                      onClick={() => this.dleteTask(item.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Type Modal */}

          <div className="dspOff" id="typeModal">
            <div className="dboxback">
              <img src={back} onClick={this.closeTypeModal} />
            </div>
            <div className="dboxviewdata">
              {this.state.taskWorkArray.map((item, index) => {
                return (
                  <div className="dviewtask">
                    <span>{item.data.task}</span>
                    <span>{item.data.desc}</span>
                    {/* <img */}
                    {/* // src={Delete} */}
                    {/* // className="deletelogo" */}
                    {/* // onClick={() => this.dleteTask(item.id)} */}
                    {/* /> */}
                  </div>
                );
              })}
            </div>
          </div>

          {/* add Modal */}
          <div className="dspOff" id="addModal">
            <div className="head addhead">
              <div className="dboxback">
                <img src={back} onClick={this.closeAddModal} />
              </div>
              <input
                type="text"
                placeholder="Add task"
                value={this.state.task}
                onChange={this.handleTask}
                className="addInput"
                required="required"
              />
            </div>
            <div className="dboxAddForm">
              {/* <div className="dboxdate">
                <label className="labels" id="firstlabel">
                  Choose date
                </label>
                <span className="datetime">Today, 12:00 - 13:00</span>
              </div> */}

              <div className="dboxtype">
                <label className="labels">Choose task type</label>
                <div className="taskType">
                  <input
                    type="button"
                    className="tasktypeopt"
                    value="Work"
                    onClick={this.handleTaskType}
                  />
                  <input
                    type="button"
                    className="tasktypeopt"
                    value="Personal"
                    onClick={this.handleTaskType}
                  />
                  <input
                    type="button"
                    className="tasktypeopt"
                    value="Shopping"
                    onClick={this.handleTaskType}
                  />
                  <input
                    type="button"
                    className="tasktypeopt"
                    value="Health"
                    onClick={this.handleTaskType}
                  />
                  <input
                    type="button"
                    className="tasktypeopt"
                    value="Other"
                    onClick={this.handleTaskType}
                  />
                </div>
              </div>
              <div className="desc">
                <label className="labels">Write desc</label>
                <div>
                  <textarea
                    placeholder="Description..."
                    className="taskDesc"
                    value={this.state.desc}
                    onChange={this.handleDesc}
                  ></textarea>
                </div>
              </div>
              <div className="borderline"></div>
              <div className="taskSubmitbtn">
                <button onClick={this.addTask}>add task</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
