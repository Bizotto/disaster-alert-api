import './prisma/prismaConfig';
import express from 'express';
import cors from 'cors';
import { routes } from './app/routes';
import { Server } from 'socket.io';
import { createServer } from 'http';
import AlertRepository from './app/repositories/AlertRepository';

const PORT = process.env.PORT || 3000;

const app = express();
const http = createServer(app);
const socketIO = new Server(http);
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());
app.use(routes);

socketIO.on('connection', async socket => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('newAlert', async data => {
    console.log(data);
    const alerts = await AlertRepository.findAll();
    if (alerts.length) {
      socketIO.emit('newAlert', alerts);
    }
  });
  const alerts = await AlertRepository.findAll();
  if (alerts.length) {
    socketIO.emit('newAlert', alerts);
  }

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
