import React, { useCallback } from 'react';
import { useTestContext } from '../../context/testContext';
import styles from './styles/test.module.css';

interface IOptions {
  isTiming: boolean;
  reset: () => void;
}

const Options = ({ isTiming, reset }: IOptions) => {
  const context = useTestContext();

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