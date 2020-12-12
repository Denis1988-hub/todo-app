import React, {Component} from 'react';
import classes from './Sidebar.module.css'
import Profile from "../../components/Profile/Profile";
import SidebarStatusFilter from "../../components/SidebarStatusFilter/SidebarStatusFilter";

class Sidebar extends Component {

    state = {
        data: [
            {filter: 'all',  colorIcon: 'blue', classIcon: 'fas fa-infinity', label: 'Все'},
            {filter: 'important',  colorIcon: 'gold', classIcon: 'fas fa-star', label: 'Важные'},
            {filter: 'done',  colorIcon: 'green', classIcon: 'fas fa-check', label: 'Завершенные'},
            {filter: 'deleted',  colorIcon: 'red', classIcon: 'far fa-trash-alt', label: 'Удаленные'}
        ]
    };

  render() {
      const { data } = this.state;
    return (
        <div className={classes.Sidebar}>
          <p className={classes.SidebarHeader}>To Do</p>
          <Profile/>

            {
                data.map((item, index) => {
                    return(
                        <SidebarStatusFilter
                            key={index}
                            classIcon={item.classIcon}
                            filter={item.filter}
                            colorIcon={item.colorIcon}
                            label={item.label}
                            filterItem={this.props.filter}
                        />
                    )
                })
            }

        </div>
    );
  }
}

export default Sidebar;