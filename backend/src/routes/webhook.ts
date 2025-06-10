import { Router } from 'express';
import { supabase } from '../utils/supabase.js';

const router = Router();

// POST /api/webhook/:cliente_id
router.post('/:cliente_id', async (req, res) => {
  const { cliente_id } = req.params;
  const { message } = req.body;

  try {
    // Process the message and generate a response
    const responseMessage = `Processed message for client ${cliente_id}: ${message}`;

    // Send the response to the Evolution instance
    // This is a placeholder for sending the response
    console.log(`Sending response to Evolution instance: ${responseMessage}`);

    res.json({ success: true, response: responseMessage });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

export default router;
