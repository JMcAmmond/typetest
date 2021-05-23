import React, { useMemo } from 'react';
import { useTestContext } from '../../context/testContext';
import styles from './styles/test.module.css';

interface IStats {
  isTiming: boolean;
  hasFinished: boolean;
}

const Stats = ({ isTiming, hasFinished }: IStats) => {
  const { WPM, RawWPM, Correct, Incorrect, Accuracy } = useTestContext();

  const wpm = useMemo(() => {
    if (isTiming) return '0';
    return WPM();
  }, [WPM, isTiming]);

  const raw = useMemo(() => {
    if (isTiming) return '-';
    return RawWPM();
  }, [RawWPM, isTiming]);

  const acc = useMemo(() => {
    if (isTiming) return '-';
    return Accuracy() + '%';
  }, [Accuracy, isTiming]);

  const corr = useMemo(() => {
    if (isTiming) return '-';
    return Correct();
  }, [Correct, isTiming]);

  const incorr = useMemo(() => {
    if (isTiming) return '-';
    return Incorrect();
  }, [Incorrect, isTiming]);

  return (
    <div className={styles.stats}>
      <h2>{wpm} WPM</h2>
      <div className={styles.table}>
        <div><span>Raw WPM</span><span>{raw}</span></div>
        <div><span>Accuracy</span><span>{acc}</span></div>
        <div><span>Correct Words</span><span>{corr}</span></div>
        <div><span>Incorrect Words</span><span>{incorr}</span></div>
      </div>
    </div>
  )
}

export default Stats;