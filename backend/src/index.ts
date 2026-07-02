import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/auth';
import propertiesRoutes from './routes/properties';
import adsRoutes from './routes/ads';
import marketplaceRoutes from './routes/marketplace';
import paymentsRoutes from './routes/payments';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/payments', paymentsRoutes);

// Health check
app.get('/api', (req, res) => {
  res.send('Forest Ad Land API is running on Vercel');
});
app.get('/', (req, res) => {
  res.send('Forest Ad Land API is running');
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
