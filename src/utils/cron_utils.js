const cron = require ('node-cron');
const logger = require ('../config/logger');

function generateRandomTime () {
  let hour, minute, nextRun;
  do {
    hour = Math.floor (Math.random () * 24);
    minute = Math.floor (Math.random () * 60);
    nextRun = new Date ();
    nextRun.setHours (hour, minute, 0, 0);
  } while (nextRun <= Date.now ());

  return {hour, minute, nextRun};
}

function scheduleNextExecution (callback) {
  const {hour, minute, nextRun} = generateRandomTime ();
  // const hour = 9; // For testing, set to 9:00 AM
  // const minute = 57; // For testing, set to 9:00 AM
  const cronExpression = `${minute} ${hour} * * *`;

  cron.schedule (cronExpression, async () => {
    try {
      logger.info (`Executing scheduled task at ${hour}:${minute}`);
      await callback ();

      // After execution completes, immediately schedule next run
      scheduleNextExecution (callback);
    } catch (error) {
      logger.error ('Task execution failed:', error);
      // Even if task fails, schedule next run
      scheduleNextExecution (callback);
    }
  });
  console.log (`Next execution scheduled for ${nextRun}`);
  logger.info (`Next execution scheduled for ${nextRun}`);
}

module.exports = {generateRandomTime, scheduleNextExecution};
