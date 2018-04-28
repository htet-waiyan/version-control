const mongoose = require('mongoose');
mongoose.connect(process.env.VERSION_DB_URL, error => {
    if(error) throw error;

    logger.info('Database connection has estabilished');
});