import React, { useCallback } from 'react';
import { useTestContext } from '../../context/testContext';
import styles from './styles/test.module.css';

interface IOptions {
  isTiming: boolean;
  reset: () => void;
}

const Options = ({ isTiming, reset }: IOptions) => {
  const context = useTestContext();

  const handleDurationChange = useCallback((e) => {
    if (!isTiming) {
      context.Duration = Number(e.target.value);
      reset();
    }
  }, [context, isTiming, reset]);

  const handleAdvancedChange = useCallback((e) => {
    if (!isTiming) {
      context.UseAdvanced = e.target.value === 'true' ? true : false;
      reset();
    }
  }, [context, isTiming, reset]);

  const handleNumberChange = useCallback((e) => {
    if (!isTiming) {
      context.UseNumbers = e.target.value === 'true' ? true : false;
      reset();
    }
  }, [context, isTiming, reset]);

  const handlePunctuationChange = useCallback((e) => {
    if (!isTiming) {
      context.UsePunctuation = e.target.value === 'true' ? true : false;
      reset();
    }
  }, [context, isTiming, reset]);

  return (
    <div className={styles.optionsContainer}>
      <div className={styles.option}>
        <span>Duration</span>
        <div>
          <label className={context.Duration === 10 ? styles.activeOption : ''}>
            <input type="radio" value="10" name="dur-1" onChange={handleDurationChange} checked={context.Duration === 10} />
            0:10
          </label>
          <label className={context.Duration === 30 ? styles.activeOption : ''}>
            <input type="radio" value="30" name="dur-2" onChange={handleDurationChange} checked={context.Duration === 30} />
            0:30
          </label>
          <label className={context.Duration === 60 ? styles.activeOption : ''}>
            <input type="radio" value="60" name="dur-3" onChange={handleDurationChange} checked={context.Duration === 60} />
            1:00
          </label>
          <label className={context.Duration === 120 ? styles.activeOption : ''}>
            <input type="radio" value="120" name="dur-4" onChange={handleDurationChange} checked={context.Duration === 120} />
            2:00
          </label>
          <label className={context.Duration === 300 ? styles.activeOption : ''}>
            <input type="radio" value="300" name="dur-5" onChange={handleDurationChange} checked={context.Duration === 300} />
            5:00
          </label>
        </div>
      </div>

      <div className={styles.option}>
        <span>Word List</span>
        <div>
          <label className={!context.UseAdvanced ? styles.activeOption : ''}>
            <input type="radio" value="false" name="advan-Simple" onChange={handleAdvancedChange} checked={!context.UseAdvanced} />
            Simple
          </label>
          <label className={context.UseAdvanced ? styles.activeOption : ''}>
            <input type="radio" value="true" name="advan-Advanced" onChange={handleAdvancedChange} checked={context.UseAdvanced} />
            Advanced
          </label>
        </div>
      </div>

      <div className={styles.option}>
        <span>Numbers</span>
        <div>
          <label className={context.UseNumbers ? styles.activeOption : ''}>
            <input type="radio" value="true" name="num-Yes" onChange={handleNumberChange} checked={context.UseNumbers} />
            On
          </label>
          <label className={!context.UseNumbers ? styles.activeOption : ''}>
            <input type="radio" value="false" name="num-No" onChange={handleNumberChange} checked={!context.UseNumbers} />
            Off
          </label>
        </div>
      </div>

      <div className={styles.option}>
        <span>Punctuation</span>
        <div>
          <label className={context.UsePunctuation ? styles.activeOption : ''}>
            <input type="radio" value="true" name="punc-Yes" onChange={handlePunctuationChange} checked={context.UsePunctuation} />          
            On
          </label>
          <label className={!context.UsePunctuation ? styles.activeOption : ''}>
            <input type="radio" value="false" name="punc-No" onChange={handlePunctuationChange} checked={!context.UsePunctuation} />
            Off
          </label>
        </div>
      </div>
    </div>
  )
}

export default Options;