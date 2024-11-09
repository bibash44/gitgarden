const cron = require("node-cron");
const logger = require("../config/logger");

function generateRandomTime() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  return { hour, minute };
}

function scheduleNextExecution(callback) {
  // const { hour, minute } = generateRandomTime();

  const hour =18
  const minute =43

  const cronExpression = `${minute} ${hour} * * *`;

  cron.schedule(cronExpression, async () => {
    logger.info(`Executing scheduled task at ${hour}:${minute}`);
    await callback();
  });

  logger.info(`Next execution scheduled for ${hour}:${minute}`);
}

module.exports = { generateRandomTime, scheduleNextExecution };