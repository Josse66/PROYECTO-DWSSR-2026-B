import express from 'express';
import morgan from 'morgan';
import logger from './lib/winston.js';

logger.info('🔨 creando backend');

const app = express();

// morgan manda sus logs de peticiones http a winston en lugar de imprimirlos directo en consola
app.use(
  morgan('dev', {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Servidor del proyecto funcionando');
});

export default app;
