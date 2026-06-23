import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb://javierveron:Javier123!@ac-plhhyyn-shard-00-00.d33hyf3.mongodb.net:27017,ac-plhhyyn-shard-00-01.d33hyf3.mongodb.net:27017,ac-plhhyyn-shard-00-02.d33hyf3.mongodb.net:27017/?ssl=true&replicaSet=atlas-mp4wj3-shard-0&authSource=admin&appName=CoderCluster`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
