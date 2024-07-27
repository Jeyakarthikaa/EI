"use strict";
// src/utils/Logger.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), 
    //format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    winston_1.format.printf(({ level, message }) => `${level}: ${message}`)),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'classroom-manager.log' })
    ]
});
