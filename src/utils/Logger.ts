// src/utils/Logger.ts

import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    //format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    format.printf(({ level, message }) => `${level}: ${message}`)


  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'classroom-manager.log' })
  ]
});
