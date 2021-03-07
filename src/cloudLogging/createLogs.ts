// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston';
import winston from 'winston';

// Creates a client
const loggingWinston = new LoggingWinston({
  projectId: 'firebase-tutorial-suzuki',
  keyFilename: './src/cloudLogging/key.json',
});

// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // Add Stackdriver Logging
    loggingWinston,
  ],
});

logger.info('info message', {
  name: '鈴木たろう',
  age: '34',
  like: ['ラーメン', '将棋', '睡眠'],
  attribute: { phone: '000', birth: '2000' },
});

logger.info('info message', {
  name: '鈴木次郎',
  age: '21',
  like: ['サッカー', '野球'],
  attribute: { phone: '001', birth: '2021' },
});

logger.info('info message', {
  name: '鈴木三郎',
  age: '21',
  like: ['サッカー', '野球'],
  attribute: { phone: '001', birth: '2021' },
});
