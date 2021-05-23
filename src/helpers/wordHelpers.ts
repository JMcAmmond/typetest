import WordModel from '../models/WordModel';
import { SimpleList } from '../resources/wordList';
import { AdvancedList } from '../resources/wordList'; 

export const randomWordGenerator = ({
  advanced = false,
  punctuation = false,
  numbers = false,
  maxLength = 55,
  maxAttempts = 10
} = {}) => {
  const words: string[] = [];
  let wordsLength = 0;
  let attempts = 0;
  const list = [...SimpleList];

  if (advanced) {
    list.push(...AdvancedList);
  }

  while (wordsLength <= maxLength && attempts <= maxAttempts) {
    const randomInt = Math.floor(Math.random() * list.length);
    const word = list[randomInt];
    
    if (wordsLength + word.length <= maxLength) {
      wordsLength += word.length + 1;
      words.push(list[randomInt]);
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
