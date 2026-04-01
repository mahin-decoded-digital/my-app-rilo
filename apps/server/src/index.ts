import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './lib/db';

import restaurantsRouter, { seedDatabase } from './routes/restaurants';
import menuItemsRouter from './routes/menuItems';
import cartRouter from './routes/cart';
import ordersRouter from './routes/orders';

const isProd = process.env.PROD === 'true';
console.log('[server] Environment:');
console.log('  PROD:', isProd ? '✓ true' : '✗ false (in-memory storage)');
console.log('  MONGODB_URI:', process.env.MONGODB_URI ? '✓ configured' : '✗ not set');
if (isProd && !process.env.MONGODB_URI) {
  console.warn('[server] ⚠ PROD=true but MONGODB_URI not set — falling back to in-memory!');
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[api] ${req.method} ${req.path} → ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', db: db.isProduction() ? 'mongodb' : 'in-memory' });
});

app.use('/api/restaurants', restaurantsRouter);
app.use('/api/menu-items', menuItemsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server] Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, async () => {
  console.log(`[server] API server running on http://localhost:${PORT}`);
  console.log(`[server] DB mode: ${db.isProduction() ? 'MongoDB' : 'In-memory'}`);
  
  // Seed database
  try {
    await seedDatabase();
    console.log('[server] Database seeded successfully.');
  } catch (err) {
    console.error('[server] Failed to seed database:', err);
  }
});