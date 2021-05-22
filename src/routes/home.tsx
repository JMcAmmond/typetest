import React from 'react';
import Test from '../components/test/test';
import { TestContextProvider } from '../context/testContext';
import TestModel from '../models/TestModel';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <TestContextProvider value={new TestModel()} >
        <Test />
      </TestContextProvider>
    </div>
  );
}


export default Home;