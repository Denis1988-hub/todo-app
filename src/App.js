import React, {Component} from 'react';
import classes from './App.module.css'
import Sidebar from "./containers/Sidebar/Sidebar";
import Todo from "./containers/Todo/Todo";

class App extends Component {

    state = {

    };

  render() {
    return (
        <div className={classes.app}>
          <div className={classes.wrapper}>
            <Sidebar />
            <Todo />
          </div>
        </div>
    );
  }
}

export default App;