import React from 'react';
import { useTestContext } from '../../context/testContext';
import styles from './styles/test.module.css';

interface IWPM {
  timeRemaining: number;
}

const WPM = ({ timeRemaining }: IWPM) => {
  const { WPM, Duration } = useTestContext();
  
  return (
    <div className={styles.box}>
      <span>
        {WPM(Duration - timeRemaining)}{' '}
        <span className={styles.smallFont}>
          WPM
        </span>
      </span>
    </div>
  )
}

export default WPM;