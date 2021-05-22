import React from 'react';
import Test from '../components/test/test';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <Test />
    </div>
  );
}


export default Home;