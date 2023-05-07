var cron = require('node-cron');
const logger = require('./lib/logger');
const db = require('./lib/db.js');

logger.debug("Starting Session-Manager (Stop)");
cron.schedule('* * * * *', function() {
    logger.debug("Running every minute");
    db.query(
        `UPDATE simulation SET simulation.status = 0 WHERE simulation.end_timestamp <= NOW() and simulation.status=1`,
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