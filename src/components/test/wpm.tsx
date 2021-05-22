import React from 'react';
import { useTestContext } from '../../context/testContext';
import styles from './test.module.css';

interface IWPM {
  timeRemaining: number;
}

const WPM = ({ timeRemaining }: IWPM) => {
  const { WPM, InitialDuration } = useTestContext();
  
  return (
    <div className={styles.box}>
      {WPM(InitialDuration - timeRemaining)} <span className={styles.smallFont}>WPM</span>
    </div>
  )
}

export default WPM;