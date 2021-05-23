import React from 'react';
import styles from './styles/header.module.css';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      Typing <span className={styles.primaryColor}>Test</span>
    </div>
  )
};

export default Header;