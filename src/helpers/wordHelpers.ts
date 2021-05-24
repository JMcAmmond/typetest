import WordModel from '../models/WordModel';
import { SimpleList } from '../resources/wordList';
import { AdvancedList } from '../resources/wordList'; 

const probability = (n: number) => {
  return !!n && Math.random() <= n;
};

const isProperWord = (word: any) => {
  if (word === '-') return false;
  if (!isNaN(word)) return false;

  return true;
}

export const randomWordGenerator = ({
  advanced = false,
  punctuation = false,
  numbers = false,
  maxLength = 52,
  maxAttempts = 10
} = {}) => {
  const words: string[] = [];
  let wordsLength = 0;
  let attempts = 0;
  const list: any[] = [...SimpleList];

  if (advanced) {
    list.push(...AdvancedList);
  }

  while (wordsLength <= maxLength && attempts <= maxAttempts) {
    const randomInt = Math.floor(Math.random() * list.length);
    let word = list[randomInt];

    if (numbers && probability(.05)) {
      const size = advanced ? 8425 : 123;
      word = Math.floor(Math.random() * size) + '';
    } else if (punctuation && probability(.05) && words[words.length - 1] !== '-' && words.length !== 0) {
      word = '-';
    } else if (punctuation && isProperWord(word) && probability(.1)) {
      word = '"' + word + '"';
    } else if (punctuation && isProperWord(word) && probability(.05)) {
      word = word + ';';
    } else if (punctuation && isProperWord(word) && probability(.05)) {
      word = word + ',';
    }
    
    if (wordsLength + word.length <= maxLength) {
      wordsLength += word.length + 1;
      words.push(word);
    } else {
      attempts += 1;
    }
  }

  return words;
};

export const createWordModelArray = (words: string[]) => {
  const arr: WordModel[] = [];

  words.forEach((word, i) => {
    arr.push(new WordModel(
      word
    ))
  });

  return arr;
};
