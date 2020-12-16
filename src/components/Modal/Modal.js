import React, {Component} from 'react';
import classes from './Modal.module.css';

export default class Modal extends Component {

    render() {
      const {btnModalClicked} = this.props;
        return (
                <div className={classes.Modal}>
                    <p>Вы уверены что хотите удалить?</p>
                    <div className={classes.options}>
                        <button className={classes.deleteBtn} value='delete'
                            onClick={() => btnModalClicked('delete')}
                        >Удалить</button>
                        <button className={classes.cancelBtn} value='cancel'
                            onClick={() => btnModalClicked('cancel')}
                        >Отмена</button>
                    </div>
                </div>
        )
    }
}



