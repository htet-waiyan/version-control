const _ = require('lodash');
const commonConfig = require('./');

module.exports = _.merge(commonConfig,{
    // development config
    logging : {
        level : 'debug',
        print_to_console: true
    }
})