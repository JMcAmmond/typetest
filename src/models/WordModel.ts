export default class WordModel {
  public Word: string | undefined;

  public IsCorrect: boolean | undefined;

  public TypedWord: string | undefined;

  public constructor(word: string) {
    this.Word = word;
  }
}