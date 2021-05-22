import React, { useMemo } from 'react';
import WordModel from '../../models/WordModel';
import styles from './test.module.css';

interface IStats {
  model: WordModel[];
  duration: number;
}

const Stats = ({ model, duration }: IStats) => {
  const correct = useMemo(() => {
    return model.reduce((total, word) => {
      return word.IsCorrect === true ? total + 1 : total;
    }, 0);
  }, [model]);

  const incorrect = useMemo(() => {
    return model.reduce((total, word) => {
      return word.IsCorrect === false ? total + 1 : total;
    }, 0);
  }, [model]);

  const wpm = useMemo(() => {
    return Math.round((correct / duration) * 60);
  }, [correct, duration]);

  const raw = useMemo(() => {
    return Math.round((model.length / duration) * 60);
  }, [duration, model.length]);

  const accuracy = useMemo(() => {
    return (correct / model.length) * 100;
  }, [correct, model.length]);

  return (
    <div className={styles.stats}>
      <h2>{wpm} WPM</h2>
      <div className={styles.table}>
        <div><span>Raw WPM</span><span>{raw}</span></div>
        <div><span>Accuracy</span><span>{accuracy}%</span></div>
        <div><span>Correct Words</span><span>{correct}</span></div>
        <div><span>Incorrect Words</span><span>{incorrect}</span></div>
      </div>
    </div>
  )
}

export default Stats;