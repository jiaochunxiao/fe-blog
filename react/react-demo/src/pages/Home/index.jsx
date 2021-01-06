import React from 'react';
import styles from './index.module.less';

console.log(styles);

const Home = () => {
  return (
    <div className={styles.home}>
      Welcome to home!
    </div>
  )
};

export default Home;
