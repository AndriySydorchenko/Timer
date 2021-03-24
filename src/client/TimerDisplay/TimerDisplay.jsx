import React from 'react';
import style from  "./TimerDisplay.module.scss";

const TimerDisplay = ({time = 0}) => {
    const hours = Math.floor(time / 3600);
    const hoursText = (hours < 10) ? `0${hours}` : `${hours}`;
    const minutes = Math.floor((time / 60) % 60);
    const minutesText = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const secondsText = (seconds < 10) ? `0${seconds}` : `${seconds}`;
    return (
        <span className={style.timerDisplay}>
            Time: {hoursText}:{minutesText}:{secondsText}
        </span>
    );
};

export default TimerDisplay;
