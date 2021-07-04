import React, { useState, useEffect } from 'react';
import styles from './index.module.less';

console.log(styles);

function FancyBorder(props) {
  return (
    <div className={`${styles.FancyBorder} ${styles[`FancyBorder-${props.color}`]}`}>
      {props.children}
    </div>
  );
}

const Home = () => {
  let [index, setIndex] = useState(0);

  useEffect(() => {
    console.log('---setIndex----');
    setIndex(index++);
    console.log(index);
    setTimeout(() => {
      console.log('-------settimeout-------')
      console.log(index);
      setIndex(index++);
      console.log(index);
      setIndex(index++);
      console.log(index);
    })
  }, [])
  return (
    <div>
      <h2>Welcome!{index}</h2>
      <FancyBorder color="blue">
        <h3>Welcom!{index}</h3>
      </FancyBorder>
    </div>
  );
};

export default Home;

