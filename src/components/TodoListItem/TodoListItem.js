import React from 'react';
import classes from './TodoListItem.module.css'

const TodoListItem = (props) => {

    const clsDone = [
        props.done ? classes.done : null
    ];

    const doneIcon = props.done
        ? <i className="far fa-calendar-check "/>
        : <i className="fas fa-circle-notch"/>;

    const importantIcon = props.important
        ? <i className="fas fa-star"/>
        : <i className="far fa-star"/>;

    const allItems = (
        <>
              <span>
                {doneIcon}
            </span>
            <span className={clsDone}
                  onDoubleClick={props.onToggleDone}
            >
                  {props.label}
        </span>
            <span className={classes.remove}
                  onClick={props.onDeleteTask}
            >
              <i className="far fa-trash-alt"/>
          </span>

            <span className={classes.important}
                  onClick={props.onToggleImportant}
            >
               {importantIcon}
            </span>
        </>
    );

    const deletedItems = (
        <>
            {props.label}
            <span className={classes.deleted}>
                <i className="fas fa-trash-restore" />
            </span>
        </>
    );

    return (
        <li className={classes.todoListItem}>
            {allItems}
        </li>
    )
};


export default TodoListItem;