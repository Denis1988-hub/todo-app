import React from 'react';
import classes from './SidebarStatusFilter.module.css'

const SidebarStatusFilter = (props) => {

    const {colorIcon, classIcon, filterItem, label, filter} = props;

    const iconClass = [classIcon];
    if (colorIcon)
        iconClass.push(classes[colorIcon]);

    return (
        <div className={classes.SidebarStatusFilter}
             onClick={() => filterItem(filter)}
        >
            <i className={iconClass.join(" ")}/>
            {label}
        </div>
    );
};

export default SidebarStatusFilter;