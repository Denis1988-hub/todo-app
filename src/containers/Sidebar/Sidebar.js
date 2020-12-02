import React, {Component} from 'react';
import classes from './Sidebar.module.css'
import Profile from "../../components/Profile/Profile";
import SidebarStatusFilter from "../../components/SidebarStatusFilter/SidebarStatusFilter";

class Sidebar extends Component {

  state = {
    filter: [
        'all', 'important', 'done', 'deleted'
    ]
  };

  filter = (obj, filter) => {
    switch (filter) {
      case 'all':
        return obj;
      case 'important':
        return obj.filter(el => el.important === true);
      case 'done':
        return obj.filter(el => el.done === true);
      case 'deleted':
        return obj.filter(el => el.deleted === true);
      default:
        return obj
      }
    };

  render() {
    return (
        <div className={classes.Sidebar}>
          <p className={classes.SidebarHeader}>To Do</p>
          <Profile/>
          <SidebarStatusFilter
              classIcon={"fas fa-infinity"}
              colorIcon={'blue'}>
            Все
          </SidebarStatusFilter>
          <SidebarStatusFilter
              classIcon={"fas fa-star"}
              colorIcon={'gold'}>
            Важные
          </SidebarStatusFilter>

          <SidebarStatusFilter
              classIcon={"fas fa-check"}
              colorIcon={'green'}>
            Завершенные
          </SidebarStatusFilter>

          <SidebarStatusFilter
              classIcon={"far fa-trash-alt"}
              colorIcon={'red'}>
            Удаленные
          </SidebarStatusFilter>
        </div>
    );
  }
}

export default Sidebar;