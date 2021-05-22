import React, { useMemo } from 'react';
import WordModel from '../../models/WordModel';
import styles from './test.module.css';

interface IWPM {
  model: WordModel[];
  lapsedTime: number;
}

const WPM = ({ model, lapsedTime }: IWPM) => {
  const wordsPerMinute = useMemo(() => {
    const correctWordCount = model.reduce((total, word) => {
      return word.IsCorrect ? total + 1 : total;
    }, 0);

    const wpm = (correctWordCount / lapsedTime) * 60;

    return Math.round(wpm) || 0;
  }, [lapsedTime, model]);

  return (
    <div className={styles.box}>{wordsPerMinute} <span className={styles.smallFont}>WPM</span></div>
  )
}

export default WPM;