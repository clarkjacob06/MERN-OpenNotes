import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import notesRouter from './routers/notesRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/notes', notesRouter);



connectDB().then(() => {
app.listen(PORT, () => {
    console.log('Server active')
})
})