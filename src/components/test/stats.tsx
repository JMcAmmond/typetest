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
    if (isTiming || !hasFinished) return '0';
    return WPM();
  }, [WPM, hasFinished, isTiming]);

  const raw = useMemo(() => {
    if (isTiming || !hasFinished) return '-';
    return RawWPM();
  }, [RawWPM, hasFinished, isTiming]);

  const acc = useMemo(() => {
    if (isTiming || !hasFinished) return '-';
    return Accuracy() + '%';
  }, [Accuracy, hasFinished, isTiming]);

  const corr = useMemo(() => {
    if (isTiming || !hasFinished) return '-';
    return Correct();
  }, [Correct, hasFinished, isTiming]);

  const incorr = useMemo(() => {
    if (isTiming || !hasFinished) return '-';
    return Incorrect();
  }, [Incorrect, hasFinished, isTiming]);

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