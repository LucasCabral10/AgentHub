import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import clientesRoutes from './routes/clientes.js';
import numerosRoutes from './routes/numeros.js';
import agentesRoutes from './routes/agentes.js';
import pluginsRoutes from './routes/plugins.js';
import basesRoutes from './routes/bases.js';
import responderRoutes from './routes/responder.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/clientes', clientesRoutes);
app.use('/api/numeros', numerosRoutes);
app.use('/api/agentes', agentesRoutes);
app.use('/api/plugins', pluginsRoutes);
app.use('/api/bases', basesRoutes);
app.use('/api', responderRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 AgentHub Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
