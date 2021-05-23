import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createWordModelArray, randomWordGenerator } from '../../helpers/wordHelpers';
import { useTimerManager } from '../../hooks/useTimerManager';
import WordModel from '../../models/WordModel';
import CurrentWords from './currentWords';
import NextWords from './nextWords';
import TimeRemaining from './timeRemainging';
import WPM from './wpm';

import styles from './styles/test.module.css';
import Stats from './stats';
import { useTestContext } from '../../context/testContext';
import Options from './options';

const Test = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState('');  
  const [currentWordRow, setCurrentWordRow] = useState<WordModel[]>([]);
  const [nextWordRow, setNextWordRow] = useState<string[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);

  const { startTimer, stopTimer, isTiming, timeRemaining, presetTime, timerFinished } = useTimerManager();
  const context = useTestContext();

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
    const options = {
      advanced: context.UseAdvanced,
      punctuation: context.UsePunctuation,
      numbers: context.UseNumbers
    };

    setCurrentWordRow(createWordModelArray(firstTime ? randomWordGenerator(options) : nextWordRow));
    setNextWordRow(randomWordGenerator(options));
    setWordIndex(0);
  }, [context.UseAdvanced, context.UseNumbers, context.UsePunctuation, nextWordRow]);

  /**
   * Logic needed before moving to the next letter
   */
  const beforeNextLetter = useCallback((word: string) => {
    const currentWordModel = currentWordRow[wordIndex];
    validateWord(word);
    setTyped(word);
    currentWordModel.TypedWord = word;
  }, [currentWordRow, validateWord, wordIndex]);

  /**
   * Logic needed before moving to the next word
   */
  const beforeNextWord = useCallback((word) => {
    const currentWordModel = currentWordRow[wordIndex];
    setTyped('');
    validateWord(word.trim(), true);
    setWordIndex(wordIndex + 1);

    context.AddCompletedWord(currentWordModel);
  
    if (wordIndex >= currentWordRow.length - 1) {
      shiftWordRow();
    }
  }, [context, currentWordRow, shiftWordRow, validateWord, wordIndex]);

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

    startTimer(context.Duration);
    
    if (lastTyped !== ' ') {
      beforeNextLetter(word);
    } else {
      beforeNextWord(word);
    }
  }, [beforeNextLetter, beforeNextWord, context.Duration, startTimer, validateWord]);

  /**
   * Returns settigs to original state so that the test can be run again
   */
  const reset = useCallback(() => {
    stopTimer();

    setTyped('');
    shiftWordRow(true);
    presetTime(context.Duration);
    setInputDisabled(false);

    context.Reset();
    
    setTimeout(() => {
      inputRef.current!.focus();
    }, 100);
  }, [context, presetTime, shiftWordRow, stopTimer]);

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
    <div className={styles.testContainer}>
      <div className={styles.wordsContainer}>
        <CurrentWords words={currentWordRow} wordIndex={wordIndex} />
        <NextWords words={nextWordRow} />
      </div>
      <div className={styles.testControls}>
        <input value={typed} onChange={onChange} disabled={inputDisabled} ref={inputRef} 
          className={[styles.input, styles.box, inputDisabled ? styles.inputDisabled : null].join(' ')} 
        />
        <WPM timeRemaining={timeRemaining} />
        <TimeRemaining time={timeRemaining} />
        <div className={[styles.box, styles.resetButton].join(' ')} onClick={reset}>Reset</div>
      </div>
      {!isTiming && timerFinished && (
        <Stats />
      )}
      <Options isTesting={isTiming} reset={reset} />
    </div>
  );
}


export default Test;