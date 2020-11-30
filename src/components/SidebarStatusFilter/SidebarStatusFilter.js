import React from 'react';
import classes from './SidebarStatusFilter.module.css'

const SidebarStatusFilter = (props) => {

  const { colorIcon, classIcon } = props;

  const iconClass = [
      classIcon
  ];

  if (colorIcon)
    iconClass.push(classes[colorIcon]);

  return (
      <div className={classes.SidebarStatusFilter}>
        <i className={iconClass.join(" ")} />
          {props.children}
      </div>
  );
};

export default SidebarStatusFilter;