import { useCallback, useState } from "react";
import WordModel from "../models/WordModel";

export const useWordStore = () => {
  const [wordStore, setWordStore] = useState<WordModel[]>([]);

  const addWordModel = useCallback((wordModel: WordModel) => {
    const store = [...wordStore];

    store.push(wordModel);
    setWordStore(store);
  }, [wordStore]);

  const clearWordStore = useCallback(() => {
    setWordStore([]);
  }, []);

  return {wordStore, addWordModel, clearWordStore};
};
