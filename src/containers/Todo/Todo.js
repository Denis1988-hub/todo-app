import React, {Component} from 'react';
import classes from './Todo.module.css'
import TodoList from "../../components/TodoList/TodoList";
import AddTask from "../../components/AddTask/AddTask";
import Time from "../../components/Time/Time";
import Alert from "../../components/UI/Alert/Alert";
import Sidebar from "../Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import Drawer from "../../components/UI/Drawer/Drawer";

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
        modalIsOpen: false,
        drawerIsOpen: false,
        confirmDelete: false
    };

    deletedArray = [];  //здесь будут сохраняться удаленные toDo


    // свойства для нового ТоДо
    addItem(text) {
        return {
            label: text,
            important: false,
            done: false,
            id: ++this.idNum,
            ifDelete: false
        }
    };

    // метод возвращает индекс массива
    indexArr(array, id) {
        return array.findIndex(el => el.id === id)
    }

    /* метод принимает новый ТоДо соединяеться с пред массивом и обнов state */
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

    // здесь обнов-ся state и массив хранения удал ТоДо
    onDeleteTask = id => {
        const {todoData, confirmDelete} = this.state;
        this.showModal(); // перед удал вызваеться модальное окно
        const index = this.indexArr(todoData, id);
      if (confirmDelete) {
        const newArr = [
          ...todoData.slice(0, index),
          ...todoData.slice(index + 1)
        ];
        this.createDeleteObj(todoData, index);

        this.setState(() => {

          return {
            todoData: newArr,
            deletedTodo: this.deletedArray
          }
        })
      }
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
                return this.deletedItems();
            default:
                return obj;
        }
    };

    // возвр state удаленных ТоДо
    deletedItems() {
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

    showModal = () => {
            this.setState({
                modalIsOpen: !this.state.modalIsOpen,
                drawerIsOpen: !this.state.drawerIsOpen
            })

    };

    btnModalClicked = (btnValue) => {

        if (btnValue === 'delete') {
          this.setState(({ confirmDelete }) => {
            return {
              confirmDelete: !confirmDelete
            };
          });
          this.showModal()
        } else {
          this.showModal();
        }
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
                    { this.state.drawerIsOpen ? <Drawer/> : null }
                    { this.state.modalIsOpen ? <Modal btnModalClicked={this.btnModalClicked}/> : null }
                    
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
                        <Alert/>
                    </div>
                </div>
        );
    }
}

export default Todo;