import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import aiRoutes from './routes/ai.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


connect();
// Load environment variables
const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'));

// Middleware
app.use(cors()); // Enable CORS

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Test Route
app.use('/users', userRoutes);
app.use('/ai', aiRoutes);
app.get('/', (req, res) => {
    res.send('🚀 Express Server is Running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});