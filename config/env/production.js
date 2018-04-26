const _ = require('lodash');
const commonConfig = require('./');

module.exports = _.merge(commonConfig,{
    // production config
    logging : {
        level : 'info',
        print_to_console: false
    }
})