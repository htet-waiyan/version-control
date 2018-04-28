const winston = require('winston');require('winston-daily-rotate-file');
const { format } = require('logform');
const config = require('./env/'+(process.env.NODE_ENV).toLowerCase());
const path = require('path');

module.exports = app => {
    configLogger();
}

const configLogger = () => {
    let logger = winston.createLogger({
        format: format.combine(
            format.label({label: 'VCONTROL'}),
            format.timestamp(),
            format.printf(info => {
                return `${info.timestamp} [${info.label}] ${info.level} : ${info.message}`;
            })
        ),
        transports: [
            new winston.transports.Console({level: config.logging.level || 'debug'})
        ]
    })

    if(!config.logging.print_to_console){ // not print to console, print to file
        let errorFile = path.join(config.logging.root_path,config.logging.error_file);
        let infoFile = path.join(config.logging.root_path, config.logging.info_file);

        logger = winston.createLogger({
            format: format.combine(
                format.label({label: 'VCONTROL'}),
                format.timestamp(),
                format.printf(info => {
                    return `${info.timestamp} [${info.label}] ${info.level} : ${info.message}`;
                })
            ),
            transports : [
                new winston.transports.DailyRotateFile({
                    level: config.logging.level,
                    filename: infoFile+'.%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true
                }),
                new winston.transports.DailyRotateFile({
                    level: 'error',
                    filename: errorFile+'.%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true
                })
            ]
        })
    }

    global.logger = logger;
}