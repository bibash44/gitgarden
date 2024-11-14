const cron = require("node-cron");
const logger = require("../config/logger");

function generateRandomTime() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  return { hour, minute };
}

function scheduleNextExecution(callback) {
  // const { hour, minute } = generateRandomTime();
  const hour=18
  const minute=23
  const cronExpression = `${minute} ${hour} * * *`;

 

  cron.schedule(cronExpression, async () => {
    try {
      logger.info(`Executing scheduled task at ${hour}:${minute}`);
      await callback();
      
      // After execution completes, immediately schedule next run
      scheduleNextExecution(callback);
      
    } catch (error) {
      logger.error('Task execution failed:', error);
      // Even if task fails, schedule next run
      scheduleNextExecution(callback);
    }
  });
  console.log(`Next execution scheduled for ${hour}:${minute}`);
  logger.info(`Next execution scheduled for ${hour}:${minute}`);
}

module.exports = { generateRandomTime, scheduleNextExecution };