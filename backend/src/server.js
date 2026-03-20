import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import notesRouter from './routers/notesRouter.js';
import userRouter from './routers/userRouter.js';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

process.env.NODE_ENV === 'development' && app.use(cors());

dotenv.config();

app.use(express.json());
app.use('/api/notes', notesRouter);
app.use('/api/users', userRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    })
}

connectDB().then(() => {
app.listen(PORT, () => {
    console.log('Server active')
})
})