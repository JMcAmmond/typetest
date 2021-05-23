import React, { useMemo } from 'react';
import styles from './styles/test.module.css';

interface ITimeRemaining {
  time: number;
}

const TimeRemaining = ({ time }: ITimeRemaining) => {
  const minutes = useMemo(() => {
    const mins = ~~((time % 3600) / 60);
    return mins;
  }, [time]);

  const seconds = useMemo(() => {
    let secs: string | number = ~~time % 60;

    if (secs < 10) {
      secs = "0" + secs;
    }

    return secs;
  }, [time]);

  return (
    <div className={[styles.box, styles.timer].join(' ')}>
      {minutes}:{seconds}
    </div>
  )
}

export default TimeRemaining;