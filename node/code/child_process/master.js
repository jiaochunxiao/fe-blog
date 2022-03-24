const {fork} = require('child_process');
const {cpus} = require('os');

cpus().map(() => {
    fork('./worker.js');
});
