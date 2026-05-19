import winston from "winston"

/* const Logger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"http"}),
        new winston.transports.File({filename:"./errors.log", level:"warn"})
    ]
}) */

const customLevelOptions = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4,
    },
    colors: {
        fatal:"red",
        error:"orange",
        warning:"yellow",
        info:"blue",
        debug:"white",
    }
}

const Logger = winston.createLogger({
    levels:customLevelOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"info",
            format:winston.format.combine(
                winston.format.colorize({colors:customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename:"./errors.log",
            level:"warning",
            format:winston.format.simple()
        })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = Logger;
    //req.logger.http(`${req.method} en ${req.url} el ${(new Date()).toLocaleDateString()}`);
    next();
}