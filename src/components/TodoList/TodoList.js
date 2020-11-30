import React from 'react';
import classes from './TodoList.module.css'
import TodoListItem from "../TodoListItem/TodoListItem";

const TodoList = ({todoData, doneCount, onToggleDone, onToggleImportant, onDeleteTask}) => {

    return (
        <div className={classes.todoContainer}>
            <h6>Задачи</h6>
            <p>завершено <strong>
              {doneCount}
            </strong> из
                <strong>&nbsp;
                    {todoData.length}
                </strong>
            </p>
            <ul className={classes.list}>
                {
                    todoData.map((item) => {
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