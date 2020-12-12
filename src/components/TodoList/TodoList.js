import React from 'react';
import classes from './TodoList.module.css'
import TodoListItem from "../TodoListItem/TodoListItem";

const TodoList = ({todoData, onToggleDone, onToggleImportant, onDeleteTask}) => {

    const isEmpty = () => {
        return Object.keys(todoData).length === 0;
    };

    return (
        <div className={classes.todoContainer}>
            <p>Задачи</p>
            <ul className={classes.list}>
                {
                    isEmpty()
                        ? (<div className={classes.empty}>
                            <i className="far fa-clipboard"><h2>Ничего нет</h2></i>
                        </div>)
                        : todoData.map((item) => {
                        return (
                            <TodoListItem
                                key={item.id}
                                {...item}
                                onToggleDone={() => onToggleDone(item.id)}
                                onToggleImportant={() => onToggleImportant(item.id)}
                                onDeleteTask={() => onDeleteTask(item.id)}
                            />
                        )
                    })
                }


            </ul>
        </div>
    );
};

export default TodoList;