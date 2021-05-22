import WordModel from '../models/WordModel';
import { WordList } from '../resources/wordList'; 

export const randomWordGenerator = (count = 10) => {
  const words: string[] = [];

  for(let i=0; i < count; i += 1) {
    const randomInt = Math.floor(Math.random() * WordList.length);
    words.push(WordList[randomInt]);
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
