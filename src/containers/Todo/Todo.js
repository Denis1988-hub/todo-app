import React, {Component} from 'react';
import classes from './Todo.module.css'
import TodoList from "../../components/TodoList/TodoList";
import AddTask from "../../components/AddTask/AddTask";
import Time from "../../components/Time/Time";
import Sidebar from "../Sidebar/Sidebar";

class Todo extends Component {

  state = {
    todoData: [],
    count: 0,
    filter: '',
    deletedTodo: [],
  };

  idNum = 0;
  deletedArray = [];  //здесь будут сохраняться удаленные toDo

  // генератор ТоДо
  createTodoData(label) {
    return {
      label,
      important: false,
      done: false,
      id: ++this.idNum,
      ifDelete: false
    }
  }

  // принимает текст и отправляет в генератор тоДо
  addItem(text) {
    return this.createTodoData(text)
  };

  /* метод принимает новый ТоДо соединяеться с пред массивом и обнов хранилище */
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
    });
  };

  // метод возвращает индекс массива
  indexArr(array, id) {
    return array.findIndex(el => el.id === id)
  }

  onToggleDone = id => {
    const {todoData} = this.state;
    const index = this.indexArr(todoData, id);
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

  // метод реагирует на нажатие иконки <delete>
  onDeleteTask = id => {
    const {todoData} = this.state;
    const index = this.indexArr(todoData, id);
    const newArr = [
      ...todoData.slice(0, index),
      ...todoData.slice(index + 1)
    ];
      setTimeout(() => {
        this.createDeleteObj(todoData, index);  // создается массив удаленных задач
        this.setState(() => {
          return {
            todoData: newArr,
            deletedTodo: this.deletedArray,
          }
        });
      }, 300);
      clearTimeout();
    };


  // здесь обраб-я удаленные ТоДо
  createDeleteObj(obj, index) {
    const sliceTask = [...obj.slice(index)];
    sliceTask[0].ifDelete = true;
    this.deletedArray.push(...sliceTask);
    return this.deletedArray
  }

  //фильтр бок панели принимает значение и сохр в сост-е
  resFilter = (filter) => {
    this.setState(() => {
      return {
        filter
      }
    });
  };

  // возвращает отфильтр объект
  getFilteredItems = (obj, filter) => {
    switch (filter) {
      case'all':
        return obj;
      case 'important':
        return obj.filter(el => el.important);
      case 'done':
        return obj.filter(el => el.done);
      case 'deleted':
        return this.showDeletedItems();
      default:
        return obj;
    }
  };

  // возвр state удаленных ТоДо
  showDeletedItems() {
    return this.state.deletedTodo;
  }

  // восстав удал То
  onRestoreDeleteItem = id => {
    const {todoData} = this.state;
    const index = this.indexArr(this.deletedArray, id);
    const sliceObj = this.deletedArray.splice(index, 1); // удалить от индекса
    sliceObj[0].ifDelete = false;                                   //а второй аргумент сколько эл-тов
    const newArr = [
      ...todoData,
      ...sliceObj,
    ];
    sliceObj.pop(); //очистить п окончанию массив
    this.setState(() => {
      return {
        todoData: newArr,
        deletedTodo: this.deletedArray
      }
    })
  };


  render() {
    const {todoData, count, filter} = this.state;
    const showFilteredItems = this.getFilteredItems(todoData, filter);

    const cls = [
      classes.todo
    ];

    if (todoData.length > 6)
      cls.push(classes.overflow);   //добавление скролла по условию

    return (
        <div className={classes.wrapper}>

          <Sidebar
              todoData={todoData}
              doneCount={count}
              filter={this.resFilter}
          />
          <div className={cls.join(' ')}>
            <Time/>

            <TodoList
                todoData={showFilteredItems}
                onToggleDone={this.onToggleDone}
                onToggleImportant={this.onToggleImportant}
                onDeleteTask={this.onDeleteTask}
                onRestoreItem={this.onRestoreDeleteItem}
            />
            <AddTask
                onAddTask={this.onAddTask}
            />
          </div>
        </div>
    );
  }
}


export default Todo;