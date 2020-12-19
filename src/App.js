import React from 'react';
import classes from './App.module.css'
import Todo from "./containers/Todo/Todo";

const App = (props) => {
  return (
      <div className={classes.app}>
        <Todo/>
      </div>
  )
};

export default App;