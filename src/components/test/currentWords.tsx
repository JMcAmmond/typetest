import React from 'react';
import WordModel from '../../models/WordModel';
import styles from './styles/test.module.css';

interface ICurrentWords {
  words: WordModel[];
  wordIndex: number;
}

const CurrentWords = ({ words, wordIndex } : ICurrentWords) => {
  return (
    <div>
      {words.map((model, i) => {
        const active = i === wordIndex ? styles.active : null;
        const isCorrect = model.IsCorrect === true ? styles.correct : null;
        const isIncorrect = model.IsCorrect === false ? styles.incorrect : null;
        return <span key={i} className={[styles.word, active, isCorrect, isIncorrect].join(' ')}>{model.Word} </span>
      })}
    </div>
  )
}

export default CurrentWords;