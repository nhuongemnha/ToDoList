import React, { Component } from "react";
import ChildComponent from "./ChildComponent";

class LifeCycleReact extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
    console.log("constructor");
  }

  //   Được gọi khi component này được sử dụng trên DOM (giao diện của app)
  static getDerivedStateFromProps(newProps, currentState) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  //   shouldComponentUpdate() {
  //     return true;
  //   }

  // Được gọi khi setState hoặc props
  shouldComponentUpdate(newProps, newState) {
    // Return true thì chạy tiếp các LifeCycle còn lại, ngược lại return false thì sẽ dừng lại không chạy tiếp các LifeCycle
    return true;
  }

  render() {
    console.log("render Parent");
    return (
      <div>
        <h1>Parent Component</h1>
        <span>Number: {this.state.number}</span>
        <button
          onClick={() =>
            this.setState({
              number: this.state.number + 1,
            })
          }
          className="btn btn-success"
        >
          +
        </button>
        {this.state.number === 1 ? <ChildComponent /> : ""}
      </div>
    );
  }
  //   Được gọi sau render và chỉ gọi 1 lần duy nhất (trạng thái mounting)
  componentDidMount() {
    console.log("componentDidMount");
  }

  // Lần đầu sẽ không gọi, chỉ gọi khi setState hoặc thay đổi props
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }
}

export default LifeCycleReact;
