import WordModel from "./WordModel";

export default class TestModel {
  public CompletedWords: WordModel[];

  public InitialDuration: number;

  public AddCompletedWord = (wordModel: WordModel) => {
    this.CompletedWords.push(wordModel);
  };

  public Correct = () => {
    return this.CompletedWords.reduce((total, word) => {
      return word.IsCorrect === true ? total + 1 : total;
    }, 0);
  };

  public Incorrect = () => {
    return this.CompletedWords.reduce((total, word) => {
      return word.IsCorrect === false ? total + 1 : total;
    }, 0);
  };

  public WPM = (duration: number = this.InitialDuration) => {
    return Math.round((this.Correct() / duration) * 60) || 0;
  };

  public RawWPM = () => {
    return Math.round((this.CompletedWords.length / this.InitialDuration) * 60) || 0;
  };

  public Accuracy = () => {
    return (this.Correct() / this.CompletedWords.length) * 100 || 0;
  };

  public Reset = () => {
    this.CompletedWords = [];
  };

  public constructor() {
    this.CompletedWords = [];
    this.InitialDuration = 5;
  }
}