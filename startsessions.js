var cron = require('node-cron');
const logger = require('./lib/logger');
const db = require('./lib/db.js');

logger.debug("Starting Session-Manager (Start)");
cron.schedule('* * * * *', () => {
  logger.debug("Running every minute");
  db.query(
    `UPDATE simulation SET simulation.status = 2 WHERE  NOW() >= simulation.start_timestamp and simulation.status=3`,
    (err, result) => {
        if (err) {
            throw err;
        }
        logger.debug(result);
        }
);
}, {
  scheduled: true,
  timezone: "America/Mexico_City"
});