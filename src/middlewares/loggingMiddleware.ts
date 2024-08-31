import winston, { format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// format for logs
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create logger instance
const logger = winston.createLogger({
    level: 'info', // default logging level
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat 
    ),
    transports: [
        new transports.Console(), // Log on console
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
        new transports.File({ filename: 'logs/combined.log' }) // Log all levels to a file
    ]
});

// If not in production then log to the console with the colorized format
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            colorize(),
            logFormat
        )
    }));
}

export default logger;
