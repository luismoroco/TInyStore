import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'HELLO WORLD' });
});

app.listen(3000, () => console.log('GOD 6000'));
