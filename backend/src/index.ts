import express from 'express';
import cors from 'cors';
import agentesRouter from './routes/agentes.js';
import webhookRouter from './routes/webhook.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/agentes', agentesRouter);
app.use('/api/webhook', webhookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
