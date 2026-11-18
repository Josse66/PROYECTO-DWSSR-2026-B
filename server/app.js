import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor del proyecto funcionando');
});

export default app;