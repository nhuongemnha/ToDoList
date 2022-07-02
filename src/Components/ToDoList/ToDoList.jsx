import React, { Component } from "react";
import { Container } from "../../ComponentToDoList/Container";
import { ThemeProvider } from "styled-components";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { ToDoListPrimaryTheme } from "../../Themes/ToDoListPrimaryTheme";
import { ToDoListLightTheme } from "../../Themes/ToDoListLightTheme";
import { Dropdown } from "../../ComponentToDoList/Dropdown";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "../../ComponentToDoList/Heading";
import { TextField, Label, Input } from "../../ComponentToDoList/TextField";
import { Button } from "../../ComponentToDoList/Button";
import { Table, Tr, Td, Th, Thead, Tbody } from "../../ComponentToDoList/Table";
import { connect } from "react-redux";
import { createAction } from "../../store/actions";
import { actionType } from "../../store/actions/types";
import { arrTheme } from "../../Themes/ThemeManager";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      disabled: true,
    };
  }

  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(
                        createAction(actionType.edit_task, task)
                      );
                    }
                  );
                }}
                className="ml-1"
              >
                Fix
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(
                    createAction(actionType.done_task, task.id)
                  );
                }}
                className="ml-1"
              >
                Done
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(
                    createAction(actionType.delete_task, task.id)
                  );
                }}
                className="ml-1"
              >
                Delete
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(
                    createAction(actionType.delete_task, task.id)
                  );
                }}
                className="ml-1"
              >
                Delete
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };

  // lifecycle bảng 16 nhận vào props mới đc thực thi trước renderF
  // componentWillReceiveProps(newProps) {
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName,
  //   });
  // }

  // static getDerivedStateFromProps(newProps, currentState) {
  //   // newProps: là props mới, props cũ là this.props (ko truy xuất đc)
  //   // currentState: ững với state hiện tại this.state
  //   // hoặc trả về state mới (this.state)
  //   let newState = { ...currentState, taskName: newProps.taskEdit.taskName };
  //   return newState;
  //   // trả về null state giữ nguyên
  //   // return null

  // }

  render() {
    return (
      <div>
        <ThemeProvider theme={this.props.themeToDoList}>
          <Container className="w-50">
            <Dropdown
              onChange={(e) => {
                let { value } = e.target;
                this.props.dispatch(
                  createAction(actionType.change_theme, value)
                );
              }}
            >
              {this.renderTheme()}
            </Dropdown>
            <Heading3>To do list</Heading3>
            <TextField
              value={this.state.taskName}
              onChange={(e) => {
                this.setState(
                  {
                    taskName: e.target.value,
                  },
                  () => {
                    console.log(this.state);
                  }
                );
              }}
              name="taskName"
              className="w-50"
              label="task name"
            ></TextField>
            <Button
              onClick={() => {
                // lấy thông tin người dùng nhập vào input
                let { taskName } = this.state;

                // Tạo ra 1 task object
                let newTask = {
                  id: Date.now(),
                  taskName: taskName,
                  done: false,
                };
                // Đưa task object lên redux thông qua phương thức dispatch
                this.props.dispatch(createAction(actionType.add_task, newTask));
              }}
              className="ml-2 "
            >
              <span>&#43;</span> Add Task
            </Button>
            {this.state.disabled === true ? (
              <Button
                disabled
                onClick={() =>
                  this.props.dispatch(
                    createAction(actionType.update_task, this.state.taskName)
                  )
                }
                className="ml-2 "
              >
                Update Task
              </Button>
            ) : (
              <Button
                onClick={() => {
                  let { taskName } = this.state;
                  this.setState(
                    {
                      disabled: true,
                      taskName: "",
                    },
                    () => {
                      this.props.dispatch(
                        createAction(actionType.update_task, taskName)
                      );
                    }
                  );
                }}
                className="ml-2 "
              >
                Update Task
              </Button>
            )}

            <hr />
            <Heading3>Task To Do</Heading3>
            <Table>
              <Thead>{this.renderTaskToDo()}</Thead>
            </Table>
            <Heading3>Task Complete</Heading3>
            <Table>
              <Thead>{this.renderTaskCompleted()}</Thead>
            </Table>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
  // Đây là lifecycle trả về props cũ và state cũ của component trước khi render (lifecycle này chạy sau render)
  componentDidUpdate(prevProps, prevState) {
    // So sánh nếu như props trước đó ( taskEdit trước mà khác taskEdit hiện tại thì mình mới setState)
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      console.log(prevProps.taskEdit.id != this.props.taskEdit.id);
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(ToDoList);
