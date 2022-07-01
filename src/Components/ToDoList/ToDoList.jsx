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
  state = {
    taskName: "",
  };

  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">Sửa</Button>
              <Button className="ml-1">Thêm</Button>
              <Button className="ml-1">Xóa</Button>
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
              <Button className="ml-1">Xóa</Button>
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
            <Button className="ml-2 ">Update Task</Button>
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
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
  };
};

export default connect(mapStateToProps)(ToDoList);
