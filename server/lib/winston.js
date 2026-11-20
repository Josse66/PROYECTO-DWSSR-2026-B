// importando el core de winston y format
import winston, { format } from 'winston';
// importando bibliotecas de node
import path from 'node:path';
import fs from 'node:fs';
// plug-in de winston para rotar archivos por día
import DailyRotateFile from 'winston-daily-rotate-file';

// destructurar funciones útiles de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// directorio raíz del proyecto
const rootdir = path.resolve(process.cwd());

// creando directorio de logs
const logsDir = path.join(rootdir, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// esquema de colores
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// agregando ese esquema a winston
winston.addColors(colors);

// formato para la consola
const myConsoleFormat = combine(
  colorize({ all: true }),
  label({ label: '📣: ' }),
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  printf((info) => `${info.level} ¬'${info.label} ¬${info.timestamp} ¬${info.message}`),
);

// formato para los archivos JSON
const myFileFormat = combine(format.uncolorize(), timestamp(), format.json());

// configuración de los transportes
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(logsDir, 'error.log'),
    maxsize: 5242880, // 5 MB
    maxFiles: 2,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
  readableFile: {
    level: 'info',
    filename: path.join(logsDir, 'readable.log'),
    maxsize: 5242880, // 5 MB
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint(),
    ),
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logsDir, 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: 2,
    format: myFileFormat,
  },
};

// creando el logger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transports.File(options.readableFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log'),
    }),
  ],
  exitOnError: false,
});

export default logger;
