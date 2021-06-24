import React, { useState, useEffect } from 'react';

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
  return <h2>Welcome!{index}</h2>
};

export default Home;

