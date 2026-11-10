import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.get('/hello', (req, res) => res.json({ message: 'Hello IPT2!' }));
app.use('/api/students', studentRoutes);

app.listen(8000, 'localhost', () => {
  console.log('IPT2 server: http://localhost:8000');
});
