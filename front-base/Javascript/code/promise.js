
function MyPromise(executor) {
  const self = this;
  this.status = 'pending';
  self.onFulfilled = [];
  self.onReject = [];
  function resolve(data) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
      self.data = data;
      setTimeout(() => {
        self.onFulfilled.forEach(callback => {
          callback(data);
        })
      });
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.reason = reason;
      setTimeout(() => {
        self.onReject.forEach(callback => {
          callback(reason);
        })
      });
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulFilled, onRejected) {
  onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
  const self = this;
  return new MyPromise((resolve, reject) => {
    function handle(callback) {
      try {
        const result = callback(self.data);
        if (result instanceof MyPromise) {
          result.then(value => {
            resolve(value);
          }, err => {
            reject(err);
          })
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    }
    if (self.status === 'pending') {
      self.onFulfilled.push(() => { handle(onFulFilled) });
      self.onReject.push(() => { handle(onRejected) });
    } else if (self.status === 'fulfilled') {
      setTimeout(() => {
        handle(onFulFilled);
      });
    } else {
      setTimeout(() => {
        handle(onRejected);
      });
    }
  });
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    if (value instanceof MyPromise) {
      value.then(value => {
        resolve(value);
      }, err => {
        reject(err);
      })
    } else {
      resolve(value);
    }
  });
}

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
}

MyPromise.all = function (promises) {
  const len = promises.length;
  const values = new Array(len);
  let resolvedCount = 0;
  return new MyPromise((resolve, reject) => {
    promises.forEach((p, index) => {
      Promise.resolve(p).then(value => {
        values[index] = value;
        resolvedCount++;
        if (resolvedCount === len) {
          resolve(values);
        }
      }, err => {
        reject(err);
      });
    })
  });
}
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((p, index) => {
      Promise.resolve(p).then(value => {
        resolve(value);
      }, err => {
        reject(err);
      });
    })
  });

}
MyPromise.resolve(1).then(value => {
  console.log(value);
});


const my = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('text')
  }, 5000);
}).then(data => {
  console.log('resolve data');
  console.log(data);
  return 'second data';
}, error => {
  console.log('reject:', error)
}).then(data => {
  console.log(data);
  console.log('second then')
}, error => {
  console.log('reject:', error);
});