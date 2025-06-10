import { Router } from 'express';
import { supabase } from '../utils/supabase.js';

const router = Router();

// GET /api/numeros/cliente/:clienteId
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('numeros_whatsapp')
      .select('*')
      .eq('cliente_id', req.params.clienteId);
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar números:', error);
    res.status(500).json({ error: 'Erro ao buscar números' });
  }
});

// POST /api/numeros
router.post('/', async (req, res) => {
  try {
    const { cliente_id, numero } = req.body;
    
    if (!cliente_id || !numero) {
      return res.status(400).json({ error: 'cliente_id e numero são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('numeros_whatsapp')
      .insert({ cliente_id, numero })
      .select()
      .single();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    console.error('Erro ao criar número:', error);
    
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Número já cadastrado' });
    }
    
    res.status(500).json({ error: 'Erro ao criar número' });
  }
});

// DELETE /api/numeros/:id
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('numeros_whatsapp')
      .delete()
      .eq('id', req.params.id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar número:', error);
    res.status(500).json({ error: 'Erro ao deletar número' });
  }
});

export default router;