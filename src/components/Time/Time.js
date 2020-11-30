import React from 'react';
import classes from './Time.module.css'

const Time = () => {

    let days = [
            'Воскресение','Понедельник', 'Вторник', 'Среда',
            'Четверг', 'Пятница', 'Суббота'
        ],
        moths = [
            "Январь", "Февраль", "Март", "Апрель",
            "Май", "Июнь", "Июль", "Август",
            "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];


    let date = new Date(),
        day = days[date.getDay()],
        dateNum = date.getDate(),
        month = moths[date.getMonth()];


    return (
        <div className={classes.time}>
            <p>
                Mой День
            </p>
            <span className={classes.date}>
                    {`${day}, ${month} ${dateNum}`}
            </span>
        </div>
    );
};

export default Time;