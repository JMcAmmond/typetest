import React, { useCallback } from 'react';
import { useTestContext } from '../../context/testContext';

interface IOptions {
  isTesting: boolean;
  reset: () => void;
}

const Options = ({ isTesting, reset }: IOptions) => {
  const context = useTestContext();

  const handleAdvancedChange = useCallback((e) => {
    if (!isTesting) {
      context.UseAdvanced = e.target.value === 'true' ? true : false;
      reset();
    }
  }, [context, isTesting, reset]);

  const handleNumberChange = useCallback((e) => {
    if (!isTesting) {
      context.UseNumbers = e.target.value === 'true' ? true : false;
      reset();
    }
  }, [context, isTesting, reset]);

  const handlePunctuationChange = useCallback((e) => {
    if (!isTesting) {
      context.UsePunctuation = e.target.value === 'true' ? true : false;
      reset();
    }
  }, [context, isTesting, reset]);

  return (
    <div>
      <fieldset id="advanced">
        <label>
          <input type="radio" value="false" name="advan-Simple" onChange={handleAdvancedChange} checked={!context.UseAdvanced} />
          Simple
        </label>
        <label>
          <input type="radio" value="true" name="advan-Advanced" onChange={handleAdvancedChange} checked={context.UseAdvanced} />
          Advanced
        </label>
      </fieldset>

      <fieldset id="numbers">
        <label>
          <input type="radio" value="false" name="num-No" onChange={handleNumberChange} checked={!context.UseNumbers} />
          No
        </label>
        <label>
          <input type="radio" value="true" name="num-Yes" onChange={handleNumberChange} checked={context.UseNumbers} />
          Yes
        </label>
      </fieldset>

      <fieldset id="punctuation">
        <label>
          <input type="radio" value="false" name="punc-No" onChange={handlePunctuationChange} checked={!context.UsePunctuation} />
          No
        </label>
        <label>
          <input type="radio" value="true" name="punc-Yes" onChange={handlePunctuationChange} checked={context.UsePunctuation} />
          Yes
        </label>
      </fieldset>
    </div>
  )
}

export default Options;