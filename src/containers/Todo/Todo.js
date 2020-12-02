import React, {Component} from 'react';
import classes from './Todo.module.css'
import TodoList from "../../components/TodoList/TodoList";
import AddTask from "../../components/AddTask/AddTask";
import Time from "../../components/Time/Time";
import Alert from "../../components/UI/Alert/Alert";
import Sidebar from "../Sidebar/Sidebar";

class Todo extends Component {

  idNum = 1;

  createTodoData(label) {
    return {
      label,
      important: false,
      done: false,
      id: ++this.idNum
    }
  }

  state = {
    todoData: [
      this.createTodoData('Сделать зарядку'),
      this.createTodoData('Выпить чашечку кофе'),
      this.createTodoData('Погулять с собакой'),
      this.createTodoData('Принять витамины')
    ],
    count: 0,
  };


  addItem(text) {
    return {
      label: text,
      important: false,
      done: false,
      id: ++this.idNum
    }
  };

  onAddTask = text => {
    const {todoData} = this.state;
    const newTask = this.addItem(text);
    const newArr = [
      ...todoData,
      newTask
    ];
    this.setState(() => {
      return {
        todoData: newArr
      }
    })
  };

  onToggleDone = id => {
    const {todoData} = this.state;
    const index = todoData.findIndex(el => el.id === id);
    const data = {...todoData[index]};
    const newData = {...data, done: !data.done};
    const newArr = [
      ...todoData.slice(0, index),
      newData,
      ...todoData.slice(index + 1)
    ];
    this.setState(() => {
      return {
        todoData: newArr,
        count: newArr.filter(el => el.done === true).length
      }
    })


  };

  onToggleImportant = id => {
    const {todoData} = this.state;
    const index = todoData.findIndex(el => el.id === id);
    const data = {...todoData[index]};
    const newData = {...data, important: !data.important};
    const newArr = [
      ...todoData.slice(0, index),
      newData,
      ...todoData.slice(index + 1)
    ];
    this.setState(() => {
      return {
        todoData: newArr
      }
    })


  };

  onDeleteTask = id => {
    const {todoData} = this.state,
        index = todoData.findIndex(el => el.id === id);
    console.log('Deleted ', id);
    const newArr = [
      ...todoData.slice(0, index),
      ...todoData.slice(index + 1)
    ];
    this.setState(() => {
      return {
        todoData: newArr
      }
    })

  };


  render() {
    const {todoData, count} = this.state;


    return (
          <div className={classes.wrapper}>
            <Sidebar />
            <div className={classes.todo}>
              <Time/>
              <TodoList
                  todoData={todoData}
                  doneCount={count}
                  onToggleDone={this.onToggleDone}
                  onToggleImportant={this.onToggleImportant}
                  onDeleteTask={this.onDeleteTask}
              />
              <AddTask
                  onAddTask={this.onAddTask}
              />
              <Alert/>
            </div>
          </div>
    );
  }
}

export default Todo;