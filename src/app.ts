import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dogRoutes from './routes/dogRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import dotenv from 'dotenv';
import swaggerDocs from './swagger';
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());


app.use('/api', dogRoutes);
app.use('/auth', authRoutes);

app.get("/",(req,res)=> res.send("Hehe"))

// Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    const PORT: number = Number(process.env.PORT) || 9000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    swaggerDocs(app, PORT)
}

export default app;