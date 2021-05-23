import React from 'react';
import Header from '../components/header/header';
import Test from '../components/test/test';
import { TestContextProvider } from '../context/testContext';
import TestModel from '../models/TestModel';

const Home = () => {
  return (
    <div>
      <Header />
      <TestContextProvider value={new TestModel()} >
        <Test />
      </TestContextProvider>
    </div>
  );
}


export default Home;