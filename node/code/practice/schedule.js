const schedule = require('node-schedule');

const normalJob = schedule.scheduleJob('30 * * * * *', () => {
  console.log('每分钟的30秒执行一次，~~~~~~');
});