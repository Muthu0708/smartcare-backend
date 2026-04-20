import winston from 'winston';

//Logging the application events in file

export const logger=winston.createLogger({
    level:"info",
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.Console(),

        //Info the logs

        new winston.transports.File({
            filename:"src/logs/info.log",
            level:"info"
        }),

        //error the logs

        new winston.transports.File({
            filename:"src/logs/error.log",
            level:"error"
        })
    ]
});