import React, {Component} from 'react';
import classes from './Todo.module.css'
import TodoList from "../../components/TodoList/TodoList";
import AddTask from "../../components/AddTask/AddTask";
import Time from "../../components/Time/Time";
import Alert from "../../components/UI/Alert/Alert";
import Sidebar from "../Sidebar/Sidebar";

class Todo extends Component {

    idNum = 0;

    createTodoData(label) {
        return {
            label,
            important: false,
            done: false,
            id: ++this.idNum,
            ifDelete: false
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
        filter: '',
        deletedTodo: [],
    };

    deletedArray = [];  //здесь будут сохраняться удаленные toDo


    addItem(text) {
        return {
            label: text,
            important: false,
            done: false,
            id: ++this.idNum,
            ifDelete: false
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
        const newArr = [
            ...todoData.slice(0, index),
            ...todoData.slice(index + 1)
        ];
        this.createDeleteObj(todoData, index)
        this.setState(() => {
            return {
                todoData: newArr,
                deletedTodo: this.deletedArray
            }
        })

    };

    createDeleteObj(obj, index) {
        const sliceTask = [...obj.slice(index)];
        sliceTask[0].ifDelete = true
        this.deletedArray.push(...sliceTask);
        return this.deletedArray
    }

    resFilter = (filter) => {
        this.setState(() => {
            return {
                filter
            }
        });
    };

    getFilteredItems = (obj, filter) => {
        switch (filter) {
            case'all':
                return obj;
            case 'important':
                return obj.filter(el => el.important);
            case 'done':
                return obj.filter(el => el.done);
            case 'deleted':
                return this.onDeletedItems();
            default:
                return obj;
        }
    };

    onDeletedItems() {
        return this.state.deletedTodo;
    }

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