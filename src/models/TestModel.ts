import WordModel from "./WordModel";

export default class TestModel {
  public CompletedWords: WordModel[];

  public Duration: number = 60;

  public UseAdvanced: boolean = false;

  public UseNumbers: boolean = false;

  public UsePunctuation: boolean = false;

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

  public WPM = (duration: number = this.Duration) => {
    return Math.round((this.Correct() / duration) * 60) || 0;
  };

  public RawWPM = () => {
    return Math.round((this.CompletedWords.length / this.Duration) * 60) || 0;
  };

  public Accuracy = () => {
    return Math.round((this.Correct() / this.CompletedWords.length) * 100) || 0;
  };

  public Reset = () => {
    this.CompletedWords = [];
  };

  public constructor() {
    this.CompletedWords = [];
  }
}