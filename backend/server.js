import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRouter.js';

const app = express();
const port = 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//DB
connectDB();

//Routes
app.use('/api/auth', userRouter);


app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});