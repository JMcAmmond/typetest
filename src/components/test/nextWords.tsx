import React from 'react';
import styles from './styles/test.module.css';

interface INextWords {
  words: string[];
}

const NextWords = ({ words } : INextWords) => {
  return (
    <div>
      {words.map((word, i) => {
        return <span className={styles.word} key={i}>{word} </span>
      })}
    </div>
  )
}

export default NextWords;