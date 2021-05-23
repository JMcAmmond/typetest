import React from 'react';
import { useTestContext } from '../../context/testContext';
import styles from './styles/test.module.css';

const Stats = () => {
  const { WPM, RawWPM, Correct, Incorrect, Accuracy } = useTestContext();

  return (
    <div className={styles.stats}>
      <h2>{WPM()} WPM</h2>
      <div className={styles.table}>
        <div><span>Raw WPM</span><span>{RawWPM()}</span></div>
        <div><span>Accuracy</span><span>{Accuracy()}%</span></div>
        <div><span>Correct Words</span><span>{Correct()}</span></div>
        <div><span>Incorrect Words</span><span>{Incorrect()}</span></div>
      </div>
    </div>
  )
}

export default Stats;