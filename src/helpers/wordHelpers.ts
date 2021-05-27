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

const addPunctuation = (word: any, previousWord: string) => {
  let toReturn = word;
  
  if ((previousWord !== '-' && previousWord !== null) && probability(.15)) {
    toReturn = '-';
  } else if (isProperWord(word) && probability(.15)) {
    toReturn = '"' + word + '"';
  } else if (isProperWord(word) && probability(.2)) {
    toReturn = word + ';';
  } else if (isProperWord(word) && probability(.2)) {
    toReturn = word + ',';
  } else if (isProperWord(word) && probability(.2)) {
    toReturn = word + '?';
  } else if (!isNaN(word) && probability(.1)) {
    toReturn = word + '%';
  }

  if (isProperWord(word) && probability(.25)) {
    toReturn = word
      .toLowerCase()
      .replace(/\b[a-z]/, (firstLetter: string) => firstLetter.toUpperCase());
  }

  return toReturn;
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
    }
    
    if (punctuation && probability(.25)) {
      word = addPunctuation(word, words[words.length - 1]);
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
