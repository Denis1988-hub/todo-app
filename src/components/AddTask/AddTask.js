import React, {Component} from 'react';
import classes from './AddTask.module.css'


class AddTask extends Component {

  state = {
    label: ''
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onAddTask(this.state.label);
    this.setState({
      label: ''
    })
  };

  onAddLabel = e => {
   const value = e.target.value;
   this.setState({
       label: value
   })
  };

  render() {
    return (
        <form className={classes.addTask}
          onSubmit={this.onSubmit}
        >
          <button type="submit">
            <i className="fas fa-plus" />
          </button>
          <input type="text" placeholder={'Add a Task'}
                 onChange={this.onAddLabel}
                 value={this.state.label}
          />
        </form>
    );
  }
}

export default AddTask;