import dotenv from 'dotenv';
dotenv.config();
import connnectToDatabase from './db.js';
import express from 'express';
import cors from 'cors'; 

// Routes 
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';



connnectToDatabase()
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/api/config/google', (req, res)=> res.send(process.env.GOOGLE_CLIENT_ID));

const port = 5000;

app.get('/', (req, res) => {
    res.send('Api is running...')
})

app.listen(port, ()=>{
    console.log(`server runs on port ${port}`);
})
