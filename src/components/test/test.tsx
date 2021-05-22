import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createWordModelArray, randomWordGenerator } from '../../helpers/wordHelpers';
import { useTimerManager } from '../../hooks/useTimerManager';
import { useWordStore } from '../../hooks/useWordStore';
import WordModel from '../../models/WordModel';
import CurrentWords from './currentWords';
import NextWords from './nextWords';
import TimeRemaining from './timeRemainging';
import WPM from './wpm';

import styles from './test.module.css';
import Stats from './stats';

const Test = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState('');  
  const [currentWordRow, setCurrentWordRow] = useState<WordModel[]>([]);
  const [nextWordRow, setNextWordRow] = useState<string[]>([]);
  const [initialDuration, setInitialDuration] = useState(5);
  const [inputDisabled, setInputDisabled] = useState(false);

  const { wordStore, addWordModel, clearWordStore } = useWordStore();
  const { startTimer, stopTimer, isTiming, timeRemaining, presetTime, timerFinished } = useTimerManager();

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles thge word validation
   */
  const validateWord = useCallback((word, isEndOfWord = false) => {
    if (word === currentWordRow[wordIndex].Word && isEndOfWord) {
      currentWordRow[wordIndex].IsCorrect = true;
    } else if (
      (word !== currentWordRow[wordIndex].Word && isEndOfWord) || 
      !currentWordRow[wordIndex].Word!.startsWith(word)) {
      currentWordRow[wordIndex].IsCorrect = false;
    } else {
      currentWordRow[wordIndex].IsCorrect = undefined;
    }
  }, [currentWordRow, wordIndex]);

  /**
   * Shifts the next row into the current slot, generates new next word row and resets the index
   */
  const shiftWordRow = useCallback((firstTime = false) => {
    setCurrentWordRow(createWordModelArray(firstTime ? randomWordGenerator() : nextWordRow));
    setNextWordRow(randomWordGenerator());
    setWordIndex(0);
  }, [nextWordRow]);

  /**
   * Logic needed before moving to the next letter
   */
  const beforeNextLetter = useCallback((word: string) => {
    const currectWordModel = currentWordRow[wordIndex];
    validateWord(word);
    setTyped(word);
    currectWordModel.TypedWord = word;
  }, [currentWordRow, validateWord, wordIndex]);

  /**
   * Logic needed before moving to the next word
   */
  const beforeNextWord = useCallback((word) => {
    const currectWordModel = currentWordRow[wordIndex];
    setTyped('');
    validateWord(word.trim(), true);
    addWordModel(currectWordModel);
    setWordIndex(wordIndex + 1);
  
    if (wordIndex >= currentWordRow.length - 1) {
      shiftWordRow();
    }
  }, [addWordModel, currentWordRow, shiftWordRow, validateWord, wordIndex]);

  /**
   * Handles when the typed word changes
   */
  const onChange = useCallback((e) => {
    const word = e.target.value;
    const lastTyped = word.charAt(word.length - 1);

    if (word.trim().length === 0) {
      validateWord(word.trim());
      setTyped('');
      return;
    };

    startTimer(initialDuration);
    
    if (lastTyped !== ' ') {
      beforeNextLetter(word);
    } else {
      beforeNextWord(word);
    }
  }, [beforeNextLetter, beforeNextWord, initialDuration, startTimer, validateWord]);

  /**
   * Returns settigs to original state so that the test can be run again
   */
  const reset = useCallback(() => {
    stopTimer();

    setTyped('');
    shiftWordRow(true);
    presetTime(initialDuration);
    setInputDisabled(false);
    clearWordStore();
    
    setTimeout(() => {
      inputRef.current!.focus();
    }, 100);
  }, [clearWordStore, initialDuration, presetTime, shiftWordRow, stopTimer]);

  /**
   * Disabled the input when the timer stops and has fully finished
   */
  useEffect(() => {
    if (!isTiming && timerFinished) {
      setInputDisabled(true);
    }
  }, [isTiming, timerFinished]);

  /**
   * On mount then reset everything
   */
  useEffect(() => {
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.wordsContainer}>
        <CurrentWords words={currentWordRow} wordIndex={wordIndex} />
        <NextWords words={nextWordRow} />
      </div>
      <div className={styles.testControls}>
        <input value={typed} onChange={onChange} disabled={inputDisabled} ref={inputRef} 
          className={[
            styles.input, 
            styles.box,
            inputDisabled 
              ? styles.inputDisabled 
              : null
          ].join(' ')} 
        />
        <WPM model={wordStore} lapsedTime={initialDuration - timeRemaining} />
        <TimeRemaining time={timeRemaining} />
        <div className={[styles.box, styles.resetButton].join(' ')} onClick={reset}>Reset</div>
      </div>
      {!isTiming && timerFinished && (
        <Stats model={wordStore} duration={initialDuration} />
      )}
    </div>
  );
}


export default Test;