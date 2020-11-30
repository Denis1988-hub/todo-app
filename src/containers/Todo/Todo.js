import React, {Component} from 'react';
import classes from './Todo.module.css'
import TodoList from "../../components/TodoList/TodoList";
import AddTask from "../../components/AddTask/AddTask";
import Time from "../../components/Time/Time";

class Todo extends Component {

  idNum = 100;

  createTodoDataState(label) {
    return {
      label,
      important: false,
      done: false,
      id: ++this.idNum
    }
  }

  state = {
    todoData: [
        this.createTodoDataState('Сделать зарядку'),
        this.createTodoDataState('Выпить чашечку кофе'),
        this.createTodoDataState('Погулять с собакой'),
        this.createTodoDataState('Принять витамины')
    ],
    count: 0
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
        </div>
    );
  }
}

export default Todo;