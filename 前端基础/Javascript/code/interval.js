const mySetInterval = (callback, time) => {
  function inner() {
    const timer = setTimeout(() => {
      callback();
      clearTimeout(timer);
      inner();
    }, time);
  }
  inner();
};


mySetInterval(() => {
  console.log(`-------now: ${new Date()}`);
}, 1000);